import { useEffect, useState } from 'react';
import { db } from '../../firebase.config';

export default function MyPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Realiza una consulta a tu base de datos de Firebase
      const snapshot = await 
      db.ref('/prueba').once('value');
      // Obtén los datos del snapshot
      const firebaseData = snapshot.val();
      // Actualiza el estado con los datos obtenidos
      setData(firebaseData);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>¡Datos de Firebase en Next.js!</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.nombre}</li>
        ))}
      </ul>
    </div>
  );
}
