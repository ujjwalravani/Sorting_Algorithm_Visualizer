import './Bar.css';
function Bar({index, length,color}) {
    const colors = ['rgb(255, 106, 255)','white','lightgreen','yellow'];
    let barStyle = {
      height: `${length}px`,
      transform: `translateY(${350-length}px)`,
      backgroundColor : colors[color],
      //transition : '0.1s',
    }
  return (
    <> {/*this tag is called a react 'fragment'.https://www.geeksforgeeks.org/why-are-fragments-better-than-container-divs/*/}
        <div className="bar">
          <div className="color-bar" style = {barStyle}></div>
        </div>

    </>//Tags are element nodes (or just elements) and form the tree structure: <html> is at the root, then <head> and <body> are its children,

  )
}

export default Bar;