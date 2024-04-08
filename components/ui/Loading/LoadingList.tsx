export default function Loading() {
    return (
        <div className="flex items-center justify-center display-block w-full h-full">
            <div role="status" className="w-full p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700">
                <div className="flex items-center justify-between p-4 h-52 min-w-[80%]">
                    <div>
                        <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-600 w-40 mb-2.5"></div>
                        <br/>
                        <div className="w-72 h-4 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    </div>
                    <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-700 w-20"></div>
                </div>
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}