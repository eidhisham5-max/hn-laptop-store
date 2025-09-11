-- BigQuery SQL Funnel Analysis for H.N Laptop Store
-- Comprehensive conversion funnel and cohort analysis queries

-- =====================================================
-- 1. BASIC CONVERSION FUNNEL ANALYSIS
-- =====================================================

-- Main conversion funnel: Sessions → Product Views → Add to Cart → Checkout → Purchase
WITH funnel_sessions AS (
  SELECT 
    session_id,
    user_id_pseudonym,
    DATE(timestamp) as event_date,
    -- Session indicators
    CASE WHEN event_name = 'page_view' THEN 1 ELSE 0 END as has_session,
    CASE WHEN event_name = 'product_view' THEN 1 ELSE 0 END as has_product_view,
    CASE WHEN event_name = 'add_to_cart' THEN 1 ELSE 0 END as has_add_to_cart,
    CASE WHEN event_name = 'begin_checkout' THEN 1 ELSE 0 END as has_begin_checkout,
    CASE WHEN event_name = 'purchase' THEN 1 ELSE 0 END as has_purchase,
    -- Revenue data
    CASE WHEN event_name = 'purchase' THEN CAST(JSON_EXTRACT_SCALAR(event_params, '$.revenue') AS FLOAT64) ELSE 0 END as revenue
  FROM `project.dataset.events`
  WHERE 
    timestamp >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 30 DAY)
    AND event_name IN ('page_view', 'product_view', 'add_to_cart', 'begin_checkout', 'purchase')
),

session_funnel AS (
  SELECT 
    session_id,
    user_id_pseudonym,
    event_date,
    MAX(has_session) as session,
    MAX(has_product_view) as product_view,
    MAX(has_add_to_cart) as add_to_cart,
    MAX(has_begin_checkout) as begin_checkout,
    MAX(has_purchase) as purchase,
    SUM(revenue) as session_revenue
  FROM funnel_sessions
  GROUP BY session_id, user_id_pseudonym, event_date
)

SELECT 
  'Overall Funnel' as funnel_name,
  COUNT(DISTINCT session_id) as total_sessions,
  COUNT(DISTINCT CASE WHEN product_view = 1 THEN session_id END) as product_view_sessions,
  COUNT(DISTINCT CASE WHEN add_to_cart = 1 THEN session_id END) as add_to_cart_sessions,
  COUNT(DISTINCT CASE WHEN begin_checkout = 1 THEN session_id END) as checkout_sessions,
  COUNT(DISTINCT CASE WHEN purchase = 1 THEN session_id END) as purchase_sessions,
  
  -- Conversion rates
  ROUND(COUNT(DISTINCT CASE WHEN product_view = 1 THEN session_id END) * 100.0 / COUNT(DISTINCT session_id), 2) as session_to_product_view_rate,
  ROUND(COUNT(DISTINCT CASE WHEN add_to_cart = 1 THEN session_id END) * 100.0 / COUNT(DISTINCT CASE WHEN product_view = 1 THEN session_id END), 2) as product_view_to_cart_rate,
  ROUND(COUNT(DISTINCT CASE WHEN begin_checkout = 1 THEN session_id END) * 100.0 / COUNT(DISTINCT CASE WHEN add_to_cart = 1 THEN session_id END), 2) as cart_to_checkout_rate,
  ROUND(COUNT(DISTINCT CASE WHEN purchase = 1 THEN session_id END) * 100.0 / COUNT(DISTINCT CASE WHEN begin_checkout = 1 THEN session_id END), 2) as checkout_to_purchase_rate,
  ROUND(COUNT(DISTINCT CASE WHEN purchase = 1 THEN session_id END) * 100.0 / COUNT(DISTINCT session_id), 2) as overall_conversion_rate,
  
  -- Revenue metrics
  SUM(session_revenue) as total_revenue,
  ROUND(SUM(session_revenue) / COUNT(DISTINCT CASE WHEN purchase = 1 THEN session_id END), 2) as avg_order_value,
  ROUND(SUM(session_revenue) / COUNT(DISTINCT session_id), 2) as revenue_per_session
FROM session_funnel;

-- =====================================================
-- 2. DAILY FUNNEL TRENDS (LAST 30 DAYS)
-- =====================================================

WITH daily_funnel AS (
  SELECT 
    session_id,
    user_id_pseudonym,
    DATE(timestamp) as event_date,
    MAX(CASE WHEN event_name = 'page_view' THEN 1 ELSE 0 END) as has_session,
    MAX(CASE WHEN event_name = 'product_view' THEN 1 ELSE 0 END) as has_product_view,
    MAX(CASE WHEN event_name = 'add_to_cart' THEN 1 ELSE 0 END) as has_add_to_cart,
    MAX(CASE WHEN event_name = 'begin_checkout' THEN 1 ELSE 0 END) as has_begin_checkout,
    MAX(CASE WHEN event_name = 'purchase' THEN 1 ELSE 0 END) as has_purchase,
    SUM(CASE WHEN event_name = 'purchase' THEN CAST(JSON_EXTRACT_SCALAR(event_params, '$.revenue') AS FLOAT64) ELSE 0 END) as revenue
  FROM `project.dataset.events`
  WHERE 
    timestamp >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 30 DAY)
    AND event_name IN ('page_view', 'product_view', 'add_to_cart', 'begin_checkout', 'purchase')
  GROUP BY session_id, user_id_pseudonym, DATE(timestamp)
)

SELECT 
  event_date,
  COUNT(DISTINCT session_id) as total_sessions,
  COUNT(DISTINCT CASE WHEN has_product_view = 1 THEN session_id END) as product_view_sessions,
  COUNT(DISTINCT CASE WHEN has_add_to_cart = 1 THEN session_id END) as add_to_cart_sessions,
  COUNT(DISTINCT CASE WHEN has_begin_checkout = 1 THEN session_id END) as checkout_sessions,
  COUNT(DISTINCT CASE WHEN has_purchase = 1 THEN session_id END) as purchase_sessions,
  
  -- Daily conversion rates
  ROUND(COUNT(DISTINCT CASE WHEN has_product_view = 1 THEN session_id END) * 100.0 / NULLIF(COUNT(DISTINCT session_id), 0), 2) as daily_session_to_view_rate,
  ROUND(COUNT(DISTINCT CASE WHEN has_add_to_cart = 1 THEN session_id END) * 100.0 / NULLIF(COUNT(DISTINCT CASE WHEN has_product_view = 1 THEN session_id END), 0), 2) as daily_view_to_cart_rate,
  ROUND(COUNT(DISTINCT CASE WHEN has_begin_checkout = 1 THEN session_id END) * 100.0 / NULLIF(COUNT(DISTINCT CASE WHEN has_add_to_cart = 1 THEN session_id END), 0), 2) as daily_cart_to_checkout_rate,
  ROUND(COUNT(DISTINCT CASE WHEN has_purchase = 1 THEN session_id END) * 100.0 / NULLIF(COUNT(DISTINCT CASE WHEN has_begin_checkout = 1 THEN session_id END), 0), 2) as daily_checkout_to_purchase_rate,
  ROUND(COUNT(DISTINCT CASE WHEN has_purchase = 1 THEN session_id END) * 100.0 / NULLIF(COUNT(DISTINCT session_id), 0), 2) as daily_overall_conversion_rate,
  
  -- Daily revenue metrics
  SUM(revenue) as daily_revenue,
  ROUND(SUM(revenue) / NULLIF(COUNT(DISTINCT CASE WHEN has_purchase = 1 THEN session_id END), 0), 2) as daily_avg_order_value
FROM daily_funnel
GROUP BY event_date
ORDER BY event_date DESC;

-- =====================================================
-- 3. DEVICE & CHANNEL BREAKDOWN
-- =====================================================

WITH device_funnel AS (
  SELECT 
    session_id,
    JSON_EXTRACT_SCALAR(event_params, '$.device_category') as device_category,
    JSON_EXTRACT_SCALAR(event_params, '$.source') as traffic_source,
    MAX(CASE WHEN event_name = 'page_view' THEN 1 ELSE 0 END) as has_session,
    MAX(CASE WHEN event_name = 'product_view' THEN 1 ELSE 0 END) as has_product_view,
    MAX(CASE WHEN event_name = 'add_to_cart' THEN 1 ELSE 0 END) as has_add_to_cart,
    MAX(CASE WHEN event_name = 'begin_checkout' THEN 1 ELSE 0 END) as has_begin_checkout,
    MAX(CASE WHEN event_name = 'purchase' THEN 1 ELSE 0 END) as has_purchase,
    SUM(CASE WHEN event_name = 'purchase' THEN CAST(JSON_EXTRACT_SCALAR(event_params, '$.revenue') AS FLOAT64) ELSE 0 END) as revenue
  FROM `project.dataset.events`
  WHERE 
    timestamp >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 30 DAY)
    AND event_name IN ('page_view', 'product_view', 'add_to_cart', 'begin_checkout', 'purchase')
  GROUP BY session_id, device_category, traffic_source
)

SELECT 
  COALESCE(device_category, 'Unknown') as device_type,
  COUNT(DISTINCT session_id) as total_sessions,
  COUNT(DISTINCT CASE WHEN has_purchase = 1 THEN session_id END) as purchase_sessions,
  ROUND(COUNT(DISTINCT CASE WHEN has_purchase = 1 THEN session_id END) * 100.0 / COUNT(DISTINCT session_id), 2) as conversion_rate,
  SUM(revenue) as total_revenue,
  ROUND(SUM(revenue) / NULLIF(COUNT(DISTINCT CASE WHEN has_purchase = 1 THEN session_id END), 0), 2) as avg_order_value
FROM device_funnel
GROUP BY device_category
ORDER BY total_sessions DESC;

-- =====================================================
-- 4. WEEKLY COHORT ANALYSIS
-- =====================================================

WITH user_cohorts AS (
  SELECT 
    user_id_pseudonym,
    DATE_TRUNC(DATE(MIN(timestamp)), WEEK(MONDAY)) as cohort_week,
    MIN(DATE(timestamp)) as first_purchase_date
  FROM `project.dataset.events`
  WHERE 
    event_name = 'purchase'
    AND user_id_pseudonym IS NOT NULL
    AND timestamp >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 12 WEEK)
  GROUP BY user_id_pseudonym
),

cohort_data AS (
  SELECT 
    c.cohort_week,
    c.user_id_pseudonym,
    DATE_TRUNC(DATE(e.timestamp), WEEK(MONDAY)) as activity_week,
    DATE_DIFF(DATE_TRUNC(DATE(e.timestamp), WEEK(MONDAY)), c.cohort_week, WEEK) as weeks_since_first_purchase,
    COUNT(DISTINCT CASE WHEN e.event_name = 'purchase' THEN DATE(e.timestamp) END) as purchase_days,
    SUM(CASE WHEN e.event_name = 'purchase' THEN CAST(JSON_EXTRACT_SCALAR(e.event_params, '$.revenue') AS FLOAT64) ELSE 0 END) as revenue
  FROM user_cohorts c
  LEFT JOIN `project.dataset.events` e
    ON c.user_id_pseudonym = e.user_id_pseudonym
    AND DATE(e.timestamp) >= c.first_purchase_date
    AND e.event_name IN ('purchase', 'page_view')
  GROUP BY c.cohort_week, c.user_id_pseudonym, activity_week, weeks_since_first_purchase
)

SELECT 
  cohort_week,
  COUNT(DISTINCT user_id_pseudonym) as cohort_size,
  
  -- Retention rates by week
  COUNT(DISTINCT CASE WHEN weeks_since_first_purchase = 0 THEN user_id_pseudonym END) as week_0_users,
  COUNT(DISTINCT CASE WHEN weeks_since_first_purchase = 1 THEN user_id_pseudonym END) as week_1_users,
  COUNT(DISTINCT CASE WHEN weeks_since_first_purchase = 2 THEN user_id_pseudonym END) as week_2_users,
  COUNT(DISTINCT CASE WHEN weeks_since_first_purchase = 4 THEN user_id_pseudonym END) as week_4_users,
  COUNT(DISTINCT CASE WHEN weeks_since_first_purchase = 8 THEN user_id_pseudonym END) as week_8_users,
  
  -- Retention percentages
  ROUND(COUNT(DISTINCT CASE WHEN weeks_since_first_purchase = 1 THEN user_id_pseudonym END) * 100.0 / 
        NULLIF(COUNT(DISTINCT CASE WHEN weeks_since_first_purchase = 0 THEN user_id_pseudonym END), 0), 1) as week_1_retention,
  ROUND(COUNT(DISTINCT CASE WHEN weeks_since_first_purchase = 2 THEN user_id_pseudonym END) * 100.0 / 
        NULLIF(COUNT(DISTINCT CASE WHEN weeks_since_first_purchase = 0 THEN user_id_pseudonym END), 0), 1) as week_2_retention,
  ROUND(COUNT(DISTINCT CASE WHEN weeks_since_first_purchase = 4 THEN user_id_pseudonym END) * 100.0 / 
        NULLIF(COUNT(DISTINCT CASE WHEN weeks_since_first_purchase = 0 THEN user_id_pseudonym END), 0), 1) as week_4_retention,
  ROUND(COUNT(DISTINCT CASE WHEN weeks_since_first_purchase = 8 THEN user_id_pseudonym END) * 100.0 / 
        NULLIF(COUNT(DISTINCT CASE WHEN weeks_since_first_purchase = 0 THEN user_id_pseudonym END), 0), 1) as week_8_retention,
  
  -- Revenue metrics
  SUM(revenue) as total_cohort_revenue,
  ROUND(SUM(revenue) / NULLIF(COUNT(DISTINCT user_id_pseudonym), 0), 2) as avg_revenue_per_user
FROM cohort_data
GROUP BY cohort_week
ORDER BY cohort_week DESC;

-- =====================================================
-- 5. PRODUCT CATEGORY PERFORMANCE
-- =====================================================

WITH product_funnel AS (
  SELECT 
    session_id,
    JSON_EXTRACT_SCALAR(event_params, '$.category') as product_category,
    JSON_EXTRACT_SCALAR(event_params, '$.brand') as product_brand,
    MAX(CASE WHEN event_name = 'product_view' THEN 1 ELSE 0 END) as has_product_view,
    MAX(CASE WHEN event_name = 'add_to_cart' THEN 1 ELSE 0 END) as has_add_to_cart,
    MAX(CASE WHEN event_name = 'purchase' THEN 1 ELSE 0 END) as has_purchase,
    SUM(CASE WHEN event_name = 'purchase' THEN CAST(JSON_EXTRACT_SCALAR(event_params, '$.revenue') AS FLOAT64) ELSE 0 END) as revenue,
    COUNT(CASE WHEN event_name = 'impression' THEN 1 END) as impressions
  FROM `project.dataset.events`
  WHERE 
    timestamp >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 30 DAY)
    AND event_name IN ('impression', 'product_view', 'add_to_cart', 'purchase')
    AND JSON_EXTRACT_SCALAR(event_params, '$.category') IS NOT NULL
  GROUP BY session_id, product_category, product_brand
)

SELECT 
  product_category,
  COUNT(DISTINCT session_id) as sessions_with_category,
  SUM(impressions) as total_impressions,
  COUNT(DISTINCT CASE WHEN has_product_view = 1 THEN session_id END) as product_view_sessions,
  COUNT(DISTINCT CASE WHEN has_add_to_cart = 1 THEN session_id END) as add_to_cart_sessions,
  COUNT(DISTINCT CASE WHEN has_purchase = 1 THEN session_id END) as purchase_sessions,
  
  -- Category-specific conversion rates
  ROUND(COUNT(DISTINCT CASE WHEN has_product_view = 1 THEN session_id END) * 100.0 / 
        NULLIF(SUM(impressions), 0), 2) as impression_to_view_rate,
  ROUND(COUNT(DISTINCT CASE WHEN has_add_to_cart = 1 THEN session_id END) * 100.0 / 
        NULLIF(COUNT(DISTINCT CASE WHEN has_product_view = 1 THEN session_id END), 0), 2) as view_to_cart_rate,
  ROUND(COUNT(DISTINCT CASE WHEN has_purchase = 1 THEN session_id END) * 100.0 / 
        NULLIF(COUNT(DISTINCT CASE WHEN has_add_to_cart = 1 THEN session_id END), 0), 2) as cart_to_purchase_rate,
  
  -- Revenue metrics by category
  SUM(revenue) as category_revenue,
  ROUND(SUM(revenue) / NULLIF(COUNT(DISTINCT CASE WHEN has_purchase = 1 THEN session_id END), 0), 2) as avg_order_value_category,
  ROUND(SUM(revenue) / NULLIF(COUNT(DISTINCT session_id), 0), 2) as revenue_per_session_category
FROM product_funnel
WHERE product_category IS NOT NULL
GROUP BY product_category
ORDER BY category_revenue DESC;

-- =====================================================
-- 6. CART ABANDONMENT ANALYSIS
-- =====================================================

WITH cart_analysis AS (
  SELECT 
    session_id,
    user_id_pseudonym,
    DATE(timestamp) as event_date,
    MAX(CASE WHEN event_name = 'add_to_cart' THEN timestamp END) as first_add_to_cart_time,
    MAX(CASE WHEN event_name = 'begin_checkout' THEN timestamp END) as checkout_start_time,
    MAX(CASE WHEN event_name = 'purchase' THEN timestamp END) as purchase_time,
    COUNT(CASE WHEN event_name = 'add_to_cart' THEN 1 END) as add_to_cart_events,
    COUNT(CASE WHEN event_name = 'remove_from_cart' THEN 1 END) as remove_from_cart_events,
    MAX(CASE WHEN event_name = 'add_to_cart' THEN CAST(JSON_EXTRACT_SCALAR(event_params, '$.cart_total_value') AS FLOAT64) END) as max_cart_value
  FROM `project.dataset.events`
  WHERE 
    timestamp >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 30 DAY)
    AND event_name IN ('add_to_cart', 'remove_from_cart', 'begin_checkout', 'purchase')
  GROUP BY session_id, user_id_pseudonym, DATE(timestamp)
  HAVING COUNT(CASE WHEN event_name = 'add_to_cart' THEN 1 END) > 0
)

SELECT 
  'Cart Abandonment Analysis' as analysis_type,
  COUNT(*) as sessions_with_cart,
  COUNT(CASE WHEN checkout_start_time IS NOT NULL THEN 1 END) as sessions_started_checkout,
  COUNT(CASE WHEN purchase_time IS NOT NULL THEN 1 END) as sessions_completed_purchase,
  
  -- Abandonment rates
  ROUND((COUNT(*) - COUNT(CASE WHEN checkout_start_time IS NOT NULL THEN 1 END)) * 100.0 / COUNT(*), 2) as cart_abandonment_rate,
  ROUND((COUNT(CASE WHEN checkout_start_time IS NOT NULL THEN 1 END) - COUNT(CASE WHEN purchase_time IS NOT NULL THEN 1 END)) * 100.0 / 
        NULLIF(COUNT(CASE WHEN checkout_start_time IS NOT NULL THEN 1 END), 0), 2) as checkout_abandonment_rate,
  ROUND((COUNT(*) - COUNT(CASE WHEN purchase_time IS NOT NULL THEN 1 END)) * 100.0 / COUNT(*), 2) as overall_abandonment_rate,
  
  -- Time analysis
  ROUND(AVG(CASE WHEN checkout_start_time IS NOT NULL AND first_add_to_cart_time IS NOT NULL 
    THEN TIMESTAMP_DIFF(checkout_start_time, first_add_to_cart_time, MINUTE) END), 1) as avg_time_cart_to_checkout_minutes,
  ROUND(AVG(CASE WHEN purchase_time IS NOT NULL AND checkout_start_time IS NOT NULL 
    THEN TIMESTAMP_DIFF(purchase_time, checkout_start_time, MINUTE) END), 1) as avg_time_checkout_to_purchase_minutes,
  
  -- Value analysis
  ROUND(AVG(max_cart_value), 2) as avg_cart_value,
  ROUND(AVG(CASE WHEN purchase_time IS NOT NULL THEN max_cart_value END), 2) as avg_purchased_cart_value,
  ROUND(AVG(CASE WHEN purchase_time IS NULL THEN max_cart_value END), 2) as avg_abandoned_cart_value
FROM cart_analysis;

-- =====================================================
-- 7. SEARCH TO PURCHASE FUNNEL
-- =====================================================

WITH search_funnel AS (
  SELECT 
    session_id,
    JSON_EXTRACT_SCALAR(event_params, '$.query') as search_query,
    JSON_EXTRACT_SCALAR(event_params, '$.results_count') as search_results_count,
    MAX(CASE WHEN event_name = 'search' THEN timestamp END) as search_time,
    MAX(CASE WHEN event_name = 'product_view' AND timestamp > MAX(CASE WHEN event_name = 'search' THEN timestamp END) THEN 1 ELSE 0 END) as viewed_after_search,
    MAX(CASE WHEN event_name = 'add_to_cart' AND timestamp > MAX(CASE WHEN event_name = 'search' THEN timestamp END) THEN 1 ELSE 0 END) as added_to_cart_after_search,
    MAX(CASE WHEN event_name = 'purchase' AND timestamp > MAX(CASE WHEN event_name = 'search' THEN timestamp END) THEN 1 ELSE 0 END) as purchased_after_search
  FROM `project.dataset.events`
  WHERE 
    timestamp >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 30 DAY)
    AND event_name IN ('search', 'product_view', 'add_to_cart', 'purchase')
  GROUP BY session_id, search_query, search_results_count
  HAVING MAX(CASE WHEN event_name = 'search' THEN 1 ELSE 0 END) = 1
)

SELECT 
  COUNT(DISTINCT session_id) as total_search_sessions,
  COUNT(DISTINCT CASE WHEN viewed_after_search = 1 THEN session_id END) as sessions_viewed_after_search,
  COUNT(DISTINCT CASE WHEN added_to_cart_after_search = 1 THEN session_id END) as sessions_added_to_cart_after_search,
  COUNT(DISTINCT CASE WHEN purchased_after_search = 1 THEN session_id END) as sessions_purchased_after_search,
  
  -- Search conversion rates
  ROUND(COUNT(DISTINCT CASE WHEN viewed_after_search = 1 THEN session_id END) * 100.0 / COUNT(DISTINCT session_id), 2) as search_to_view_rate,
  ROUND(COUNT(DISTINCT CASE WHEN added_to_cart_after_search = 1 THEN session_id END) * 100.0 / COUNT(DISTINCT session_id), 2) as search_to_cart_rate,
  ROUND(COUNT(DISTINCT CASE WHEN purchased_after_search = 1 THEN session_id END) * 100.0 / COUNT(DISTINCT session_id), 2) as search_to_purchase_rate,
  
  -- Search quality metrics
  ROUND(AVG(CAST(search_results_count AS INT64)), 1) as avg_search_results,
  COUNT(DISTINCT CASE WHEN CAST(search_results_count AS INT64) = 0 THEN session_id END) as zero_result_searches,
  ROUND(COUNT(DISTINCT CASE WHEN CAST(search_results_count AS INT64) = 0 THEN session_id END) * 100.0 / COUNT(DISTINCT session_id), 2) as zero_result_rate
FROM search_funnel;

-- =====================================================
-- 8. REAL-TIME FUNNEL MONITORING (LAST 24 HOURS)
-- =====================================================

WITH hourly_funnel AS (
  SELECT 
    EXTRACT(HOUR FROM timestamp) as hour_of_day,
    session_id,
    MAX(CASE WHEN event_name = 'page_view' THEN 1 ELSE 0 END) as has_session,
    MAX(CASE WHEN event_name = 'product_view' THEN 1 ELSE 0 END) as has_product_view,
    MAX(CASE WHEN event_name = 'add_to_cart' THEN 1 ELSE 0 END) as has_add_to_cart,
    MAX(CASE WHEN event_name = 'purchase' THEN 1 ELSE 0 END) as has_purchase,
    SUM(CASE WHEN event_name = 'purchase' THEN CAST(JSON_EXTRACT_SCALAR(event_params, '$.revenue') AS FLOAT64) ELSE 0 END) as revenue
  FROM `project.dataset.events`
  WHERE 
    timestamp >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 24 HOUR)
    AND event_name IN ('page_view', 'product_view', 'add_to_cart', 'purchase')
  GROUP BY EXTRACT(HOUR FROM timestamp), session_id
)

SELECT 
  hour_of_day,
  COUNT(DISTINCT session_id) as hourly_sessions,
  COUNT(DISTINCT CASE WHEN has_product_view = 1 THEN session_id END) as hourly_product_views,
  COUNT(DISTINCT CASE WHEN has_add_to_cart = 1 THEN session_id END) as hourly_add_to_cart,
  COUNT(DISTINCT CASE WHEN has_purchase = 1 THEN session_id END) as hourly_purchases,
  
  -- Hourly conversion rates
  ROUND(COUNT(DISTINCT CASE WHEN has_purchase = 1 THEN session_id END) * 100.0 / NULLIF(COUNT(DISTINCT session_id), 0), 2) as hourly_conversion_rate,
  
  -- Hourly revenue
  SUM(revenue) as hourly_revenue,
  ROUND(SUM(revenue) / NULLIF(COUNT(DISTINCT CASE WHEN has_purchase = 1 THEN session_id END), 0), 2) as hourly_avg_order_value
FROM hourly_funnel
GROUP BY hour_of_day
ORDER BY hour_of_day;

-- Owner: Data Engineer + Analytics Specialist
-- Est. Effort: 6 person-days  
-- Acceptance Criteria:
-- - All queries execute successfully on BigQuery
-- - Results provide actionable insights for funnel optimization
-- - Queries are optimized for performance with large datasets
-- - Privacy compliance maintained (no PII exposure)
-- - Documentation includes query explanations and usage examples