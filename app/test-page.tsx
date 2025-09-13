export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          🎉 الموقع يعمل بنجاح!
        </h1>
        <p className="text-gray-600 mb-6">
          تم حل جميع المشاكل والتطبيق يعمل بشكل مثالي
        </p>
        <div className="space-y-2 text-sm text-gray-500">
          <p>✅ Next.js 15.5.2</p>
          <p>✅ Tailwind CSS v4</p>
          <p>✅ TypeScript</p>
          <p>✅ PostCSS</p>
        </div>
      </div>
    </div>
  )
}