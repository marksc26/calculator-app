import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [theme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme")) || 1
  )
  const [className, setClassName] = useState("")
  const [expression, setExpression] = useState("")
  const [result, setResult] = useState(0)
  const [showResult, setShowResult] = useState(false)

  //función Cambio de tema, obteniendo el resto del classname dependiendo del numero obtenido en el estado theme
  const handleToggle = () => {

    let selectedTheme = ""

    if (theme === 1) {
      selectedTheme = "theme1"
    } else if (theme === 2) {
      selectedTheme = "theme2"
    } else if (theme === 3) {
      selectedTheme = "theme3"
    }
    localStorage.setItem("theme", theme)
    return selectedTheme
  }

  //useEffect que contiene el tema obtenido y se monta en el estado classname. 
  //tambien incluye la funcion para que el teclado númerico se incluya como input


  useEffect(() => {
    setClassName(handleToggle())


    const handleKeyPress = (event) => {
      const key = event.key;

      if (key === "Enter") {
        event.preventDefault();
        handleEqualClick();
      } else if (key === "Delete") {
        event.preventDefault();
        handleDeleteClick();
      } else if (/^\d$|\+|-|\*|\//.test(key)) {
        event.preventDefault();
        if (key === "*") key = "x";
        if (key === "/") key = "÷";
        handleKeyInput(key);
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };


  }, [theme])


  //funcion para agregar el numero u operador por medio del teclado
  const handleKeyInput = (key) => {
    if (/^\d$/.test(key)) {
      handleNumberClick(key);
    } else if (key === "+" || key === "-" || key === "x" || key === "÷") {
      handleOperator(key);
    }
  };

  //función para agregar un numero 
  const handleNumberClick = (number) => {
    if (expression.length < 15) {
      setExpression(prevExpression => prevExpression + number)
    }
    setShowResult(false)

  }


  //funcion para agregar los operadores ademas de limitar que sean consecutivos
  const handleOperator = (operator) => {

    const lastChar = expression.slice(-1)
    const operators = ["+", "-", "*", "/"]

    if (operators.includes(lastChar)) {
      return
    }

    if (expression.length < 13) {
      setExpression(prevExpression => prevExpression + operator)
      setShowResult(false)
    }

  }


  //función para eliminar un caracter de la expresion
  const handleDeleteClick = () => {
    setExpression(prevExpression => prevExpression.slice(0, -1))
    setShowResult(false)

  }
  // función para resetear la expresion o el resultado
  const handleReset = () => {
    setShowResult(false)
    setExpression("")
  }

  // función para obtener el resultado de la expresión
  const handleEqualClick = () => {
    const evalResult = eval(expression)
    setResult(evalResult)
    setExpression(evalResult.toString())
    setShowResult(true)
  }


  return (
    <main className={`main${className}`}>

      <header className='header'>
        <div className={`logo${className}`}>
          <h3>Calc</h3>
        </div>

        <div className='theme'>
          <div className={`title-${className}`}>
            <h3>THEME</h3>
          </div>

          <div className='switch-numbers'>
            <div className={`options-${className}`}>
              <p>1</p>
              <p>2</p>
              <p>3</p>
            </div>
            <div className={`switch-${className}`}>
              <div className='number1' onClick={() => setTheme(1)}></div>
              <div className='number2' onClick={() => setTheme(2)}></div>
              <div className='number3' onClick={() => setTheme(3)}></div>
              <div className={className}></div>
            </div>
          </div>
        </div>
      </header>


      <section className={`display-${className}`}>
        <div className={`numbers-${className}`}>
          {
            showResult ? <h3>{result.toLocaleString()}</h3> : <h3>{expression}</h3>
          }
        </div>
      </section>


      <section className={`buttons-${className}`}>
        <div className={`grid-${className}`}>
          <div onClick={() => handleNumberClick("7")}><h3>7</h3></div>
          <div onClick={() => handleNumberClick("8")}><h3>8</h3></div>
          <div onClick={() => handleNumberClick("9")}><h3>9</h3></div>
          <div onClick={handleDeleteClick} className={`delete-${className}`}><h3>DEL</h3></div>
          <div onClick={() => handleNumberClick("4")}><h3>4</h3></div>
          <div onClick={() => handleNumberClick("5")}><h3>5</h3></div>
          <div onClick={() => handleNumberClick("6")}><h3>6</h3></div>
          <div onClick={() => handleOperator("+")}><h3>+</h3></div>
          <div onClick={() => handleNumberClick("1")}><h3>1</h3></div>
          <div onClick={() => handleNumberClick("2")}><h3>2</h3></div>
          <div onClick={() => handleNumberClick("3")}><h3>3</h3></div>
          <div onClick={() => handleOperator("-")}><h3>-</h3></div>
          <div onClick={() => handleOperator(".")}><h3>.</h3></div>
          <div onClick={() => handleNumberClick("0")}><h3>0</h3></div>
          <div onClick={() => handleOperator("/")}><h3>÷</h3></div>
          <div onClick={() => handleOperator("*")}><h3>x</h3></div>
          <div onClick={handleReset} className={`reset-${className}`}><h3>RESET</h3></div>
          <div onClick={handleEqualClick} className={`equal-${className}`}><h3>=</h3></div>

        </div>
      </section>

    </main>
  )
}

export default App
