export default function TextInput({ content, submitContent, handleChange}) {
    return (
        <form>
            <label htmlFor="chat" className="sr-only">Your message</label>
            <div className="flex items-center px-3 py-2 rounded-lg bg-zinc-300 dark:bg-zinc-300">
                <button type="button" className="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.408 7.5h.01m-6.876 0h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM4.6 11a5.5 5.5 0 0 0 10.81 0H4.6Z"/>
                    </svg>
                    <span className="sr-only">Add emoji</span>
                </button>
                <textarea id="chat" rows="1" className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300" placeholder="Your prompt..." onChange={handleChange} value={content}></textarea>
                    <button type="button" onClick={submitContent} className="inline-flex justify-center p-2 text-indigo-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-orange-600 dark:hover:bg-gray-600">
                    <svg className="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                        <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z"/>
                    </svg>
                    <span className="sr-only">Send message</span>
                </button>
            </div>
        </form>
    )
}

