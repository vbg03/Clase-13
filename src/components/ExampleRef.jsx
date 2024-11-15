/*
Este código importa dos funciones de React:

forwardRef: permite que un componente hijo (en este caso, InputText) 
reciba una referencia (ref) desde un componente padre.
useRef: permite crear una referencia mutable que puede ser utilizada para acceder y modificar directamente un 
elemento del DOM o un valor en el ciclo de vida del componente sin causar una re-renderización.
2. Componente InputText
Aquí se define un componente llamado InputText que usa forwardRef.
 Esto permite que el componente reciba un ref (referencia) desde el componente padre y lo asigne al elemento input.

ref={ref}: se utiliza para conectar la referencia (ref) directamente al elemento <input>, 
lo que permite que el componente padre tenga acceso directo al input de este componente.
3. Componente ExampleRef

El componente ExampleRef usa la referencia inputFocus para manipular el input desde el componente hijo (InputText).

const inputFocus = useRef(null);: crea una referencia (inputFocus) que inicialmente es null, pero que luego se conectará al input del componente InputText.


handleButtonClick: esta función se ejecuta cuando se da clic en el botón. Imprime un mensaje en la consola 
y usa inputFocus.current.focus() para enfocar el input en InputText. La propiedad current de inputFocus apunta al elemento de entrada debido a la referencia (ref) pasada.

Comportamiento en Resumen
El componente ExampleRef usa useRef para crear una referencia (inputFocus).
Pasa esta referencia como ref al componente InputText.
Al hacer clic en el botón, handleButtonClick usa esta referencia para enfocar el input de InputText.
Esto permite manipular directamente un elemento del DOM (el input) en un componente hijo desde el componente padre sin necesidad de un estado intermedio.




*/

import { forwardRef, useRef } from "react";

const InputText = forwardRef((props, ref) => {
    return (
        <>
            <input type="text" ref={ref} />
        </>
    );
});

const ExampleRef = () => {
    const inputFocus = useRef(null);

    const handleButtonClick = () => {
        console.log("me diste click");
        inputFocus.current.focus();
    };

    return (
        <>
            <InputText ref={inputFocus} />
            <button onClick={handleButtonClick}>Click ref</button>
        </>
    );
};
export default ExampleRef;