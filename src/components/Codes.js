import { useEffect, useState } from 'react';
import QRCode from "react-qr-code";
import { getCodes } from '../services';

const Codes = () => {
  const [codes, setCodes] = useState([]);

  useEffect(() => {
    (async () => {
      const codes = await getCodes()

      if (codes.data?.map) {
        setCodes(codes.data)
      }

    })()
  }, [])

  return (
    <>
      <h2>QR Codes</h2>
      <div className='wrapper'>
        {codes.map(code =>
          <div key={code.jwt} >
            <p>Scan here</p>
            <QRCode value={code.jwt} />
          </div>
        )}
      </div>
    </>
  )
}

export default Codes;