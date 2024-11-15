/*
1. Importaciones
El código importa varias funciones y objetos de Firebase (collection, deleteDoc, doc, etc.), que ayudan a realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en Firestore. También se importan useState para manejar el estado en React y nanoid para generar IDs únicos.

2. useFirestore Hook
Este hook personalizado se llama useFirestore y encapsula toda la lógica para interactuar con una colección de Firestore llamada "urls". Proporciona funciones para obtener, agregar, eliminar, y actualizar datos.

3. Estados del Hook
data: almacena la lista de documentos recuperados de Firestore.
error: guarda cualquier error que ocurra en las operaciones.
loading: indica si una operación específica está en proceso (como getData o addData).

4. Funciones
getData()
Esta función recupera documentos de Firestore para el usuario autenticado actual:

Establece loading a true para indicar que se está obteniendo información.
Obtiene una referencia a la colección "urls" en Firestore y crea una consulta (query)
para filtrar los documentos por el usuario autenticado (auth.currentUser.uid).
Usa getDocs() para ejecutar la consulta y
mapea los documentos obtenidos en un array (dataDB), luego los guarda en el estado data.
Captura errores y los guarda en error, y al finalizar, establece loading a false.
addData(url)
Esta función agrega un nuevo documento a Firestore:

Crea un objeto newDoc con la URL recibida y datos adicionales, como enabled (estado habilitado) y uid del usuario.
Genera un ID único usando nanoid.
Usa setDoc() para guardar el documento en Firestore con newDoc.nanoid como ID.
Actualiza data con el nuevo documento (newDoc).
Maneja los estados loading y error.
deleteData(nanoid)
Esta función elimina un documento específico:

Establece loading para el documento específico que se está eliminando.
Obtiene la referencia al documento por su nanoid y usa deleteDoc() para eliminarlo de Firestore.
Filtra data para eliminar el documento en el estado local.
Maneja error y establece loading a false.
updateData(nanoid, newOrigin)
Actualiza un documento en Firestore con un nuevo valor para origin:

Usa updateDoc() para cambiar el campo origin en el documento especificado por nanoid.
Actualiza el estado data localmente.
Maneja loading y error.
searchData(nanoid)
Busca un documento específico en Firestore:

Usa getDoc() para obtener el documento de Firestore usando nanoid.
Retorna el documento encontrado o guarda errores si ocurren.

5. Retorno del Hook
El hook retorna un objeto que incluye data, error, loading, 
y las funciones (getData, addData, deleteData, updateData, searchData) 
para que otros componentes puedan usarlos.



*/


import {
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    query,
    setDoc,
    updateDoc,
    where,
  } from "firebase/firestore/lite";
  import { useState } from "react";
  import { db, auth } from "../firebase/firebase";
  import { nanoid } from "nanoid";
  
  export const useFirestore = () => {
    const [data, setData] = useState([]);// donde se  guardan los datos
    const [error, setError] = useState();
    const [loading, setLoading] = useState({});
   
    const getData = async () => {
      try {
        setLoading((prev) => ({ ...prev, getData: true }));//
        const dataRef = collection(db, "urls");
        const q = query(dataRef, where("uid", "==", auth.currentUser.uid));
        const querySnapshot = await getDocs(q);
        const dataDB = querySnapshot.docs.map((doc) => doc.data()); 
        setData(dataDB);
      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally {
        setLoading((prev) => ({ ...prev, getData: false }));
      }
    };
  
    const addData = async (url) => {
      try {
        setLoading((prev) => ({ ...prev, addData: true }));
        const newDoc = {
          enabled: true,
          nanoid: nanoid(6),
          origin: url,
          uid: auth.currentUser.uid,
        };
  
        const docRef = doc(db, "urls", newDoc.nanoid);
        await setDoc(docRef, newDoc);
        setData([...data, newDoc]);
      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally {
        setLoading((prev) => ({ ...prev, addData: false }));
      }
    };
  
    const deleteData = async (nanoid) => {
      try {
        setLoading((prev) => ({ ...prev, [nanoid]: true }));
        const docRef = doc(db, "urls", nanoid);
        await deleteDoc(docRef);
        setData(data.filter((item) => item.nanoid !== nanoid));
      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally {
        setLoading((prev) => ({ ...prev, [nanoid]: false }));
      }
    };
  
    const updateData = async (nanoid, newOrigin) => {
      try {
        setLoading((prev) => ({ ...prev, updateData: true }));
        const docRef = doc(db, "urls", nanoid);
        await updateDoc(docRef, { origin: newOrigin });
        setData(
          data.map((item) =>
            item.nanoid === nanoid ? { ...item, origin: newOrigin } : item
          )
        );
      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally {
        setLoading((prev) => ({ ...prev, updateData: false }));
      }
    };
  
    const searchData = async (nanoid) => {
      try {
        const docRef = doc(db, "urls", nanoid);
        const docSnap = await getDoc(docRef);
  
        return docSnap;
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
    };
  
    return {
      data,
      error,
      loading,
      getData,
      addData,
      deleteData,
      updateData,
      searchData,
    };
  };