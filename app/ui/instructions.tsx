
// This component is the ui that shows the instructions
// on how to use the app on the homepages
export default function Instructions({darkMode}: {darkMode: boolean}) {

  // Light mode styles
  let titleBg = 'bg-gray-100'
  let titleText = ''

  // Sets to dark mode if dark
  if (darkMode) {
    titleBg = 'bg-gray-900'
    titleText = 'text-white'
  }


  return(
  <div className={`flex flex-col items-center justify-center w-5/6 h-400px shadow-lg h-full rounded-lg ${titleText} ${titleBg}`}>
    <h1 className='text-xl font-bold md:text-3xl'>
      How to Use:
    </h1>
    <ol className='text-sm md:text-md p-6'>
      <li className="m-3">1.&ensp;Type in the name of a city in the search bar at the top of the screen.</li>
      <li className="m-3">2.&ensp;Wait for the results to load...</li>
      <li className="m-3">3.&ensp;Success!</li>
    </ol>
  </div>
  )
}