import { useState } from 'react'


function App() {
  const [color, setColor] = useState('olive')

  return (


    <div className="w-full h-screen duration-200"
      style={{ backgroundColor: color }}>
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 px-2">
        <div className="flex flex-wrap justify-center gap-3 shadow-xl bg-white px-3 py-2 rounded-3xl">
          <button
            onClick={() => setColor('red')}
            className="outline-none px-4 py-1 rounded-full text-white shadow-lg "
            style={{ background: "Red" }}
          >Red</button>
          <button
            onClick={() => setColor('green')}
            className="outline-none px-4 py-1 rounded-full text-white shadow-lg "
            style={{ background: "green" }}
          >green</button>
          <button
            onClick={() => setColor('yellow')}
            className="outline-none px-4 py-1 rounded-full text-white shadow-lg "
            style={{ background: "yellow" }}
          >yellow</button>
          <button
            onClick={() => setColor('pink')}
            className="outline-none px-4 py-1 rounded-full text-white shadow-lg "
            style={{ background: "pink" }}
          >pink</button>
          <button
            onClick={() => setColor('grey')}
            className="outline-none px-4 py-1 rounded-full text-white shadow-lg "
            style={{ background: "grey" }}
          >grey</button>
          <button
            onClick={() => setColor('black')}
            className="outline-none px-4 py-1 rounded-full text-white shadow-lg "
            style={{ background: "black" }}
          >Black</button>
        </div>
      </div>
    </div>


  )
}

export default App
