import { Bug, Leaf, Droplet } from "lucide-react"

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
      <div className="relative flex flex-col items-center">
        <div className="mb-8 flex items-center justify-center">
          <div className="relative h-24 w-24">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-16 w-16 rounded-full border-4 border-t-[#2E7D32] border-r-[#2E7D32] border-b-gray-200 border-l-gray-200 animate-spin"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white">
                <Droplet className="h-6 w-6 text-[#2E7D32]" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-4 flex items-center space-x-2">
          <Bug className="h-5 w-5 text-[#2E7D32]" />
          <span className="text-xl font-semibold text-gray-800">PestON</span>
          <Leaf className="h-5 w-5 text-[#2E7D32]" />
        </div>
        
        <div className="mb-2 text-sm text-gray-600">Çevre Sağlığı Hizmetleri</div>
        
        <div className="h-2 w-64 overflow-hidden rounded-full bg-gray-200">
          <div className="h-full w-full animate-pulse rounded-full bg-gradient-to-r from-[#2E7D32] to-[#4CAF50]"></div>
        </div>
        
        <div className="mt-2 text-sm text-gray-500">
          Siteniz hazırlanıyor...
        </div>
      </div>
    </div>
  )
} 