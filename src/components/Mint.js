import { Contract, providers } from 'ethers'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ABI from '../ABI'
import { decryptJWT } from '../services'




const Mint = ({ account }) => {
  const [params] = useSearchParams()
  const [tokenId, setTokenId] = useState()
  const [url, setUrl] = useState()
  const [step, setStep] = useState()


  useEffect(() => {
    if (!account) return

    (async () => {
      const authToken = params.get('authToken');

      const { data } = await decryptJWT(authToken)

      if (typeof data === 'object') {


        const provider = new providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner()
        const contractAddress = '0xD6dFbD5001FEb01aD007F67dF8AF0E033938bbf2'

        const contract = new Contract(contractAddress, ABI, signer)

        const { tokenId, maxSupply, uri, signature } = data;

        setTokenId(tokenId)


        try {
          const tx = await contract.mint(account, {
            tokenId,
            maxSupply,
            uri,
            signature
          })

          setStep(1)
          setUrl(`https://rinkeby.etherscan.io/tx/${tx.hash}`)


          await tx.wait()

          setStep(2)
          setUrl(`https://testnets.opensea.io/assets/${contractAddress}/${tokenId}`)
        } catch (e) {
          console.log(e)
        }

      }
    })()
  }, [account, params])

  return (
    <>
      Mint tokenId: {tokenId}
      {step === 1 ? <p onClick={() => window.open(url, "_blank")}>Check tx here: {url}</p> : step === 2 ? <p onClick={() => window.open(url, "_blank")}>View nft here: {url}</p> : <></>}
    </>
  )
}

export default Mint