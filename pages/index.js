import { Box, Button, Modal, Typography } from '@material-ui/core'
import { useWeb3React } from '@web3-react/core'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'
import { Injected } from '../components/wallets/connectors'

export default function Home() {
  const [addr, setAddr] = useState('')

  const {active , activate , deactivate , account} = useWeb3React()
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  console.log(account);
  
  async function connect() {
    try {
      await activate(Injected)
      const aaa = account.slice(0,5) + '...' + account.slice(-5)
      setAddr(aaa)
    } catch (error) {
      console.log(error);
    }
  }

  async function disconnect() {
    try {
      await deactivate(Injected)
    } catch (error) {
      console.log(error);
    }
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
  };

  return (
      <div className='container-fluid'>
        <div className="row bg-warning" style={{display: 'flex', alignItems: 'center'}}>
          <div className="col-6"><h1>Project</h1></div>
          <div className="col-6 text-end">
            {active ? 
            <div>
              <span className='mx-3'>Connected to: {addr}</span> 
              <Button color="primary" variant="contained" onClick={disconnect}>Disconnect</Button> 
            </div> :
            <Button variant="contained" onClick={handleOpen}>Connect Wallet</Button>
            }
            
          </div>
        </div>
        <div className="row ">
       

        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
              <h3>Connect to Wallet</h3>

            <div className='mt-4'>
              <button className='btn py-0' onClick={connect}><img onClick={handleClose} style={{width: '200px'}} src="https://opensea.io/static/images/logos/metamask.png" alt="" /></button> 
              <button className='btn py-0'><img onClick={handleClose} style={{width: '210px',transform: 'scale(1.1)'}} src="https://miro.medium.com/max/1400/1*qGrsihPq5jJSkzVDhzUmAg.png" alt="" /></button>
              <button className='btn py-0 mt-3 px-4'><img onClick={handleClose} style={{width: '190px'}} src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Binance_logo.svg/1200px-Binance_logo.svg.png" alt="" /></button>
            </div>
            
            
          </Box>
        </Modal>

        </div>
      </div>
  )
}
