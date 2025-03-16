import { MdOutlineSaveAlt } from "react-icons/md";
import Logo from '../../images/logo.png'
import Image from "next/image";
import { useState } from "react";
import * as htmlToImage from 'html-to-image';
import { toPng } from 'html-to-image';
import { saveAs } from 'file-saver';
import { QRCode } from "react-qrcode-logo";
const QrGenerator = ()=> {
    const [qrtext , changeqrtext] = useState('');
     const  handleimage = async()=>{
    const qrCodeElement =    document.getElementById('qr-code');
        if(qrtext != '' && qrCodeElement){
            // console.log(qrCodeElement);
       await htmlToImage.toPng(qrCodeElement).then((dataUrl)=>{
            // download(dataUrl, 'my-node.png')
            saveAs(dataUrl,`${qrtext}.png`);
        }).catch((msg)=>{
            console.log('error from save',msg);
        })
        }
        else {
            alert('please enter a text or number')
        }
    }
    return <div className="p-3 bg-white rounded-lg flex  flex-col gap-2 shadow-2xl">
           <div id="qr-code" className="relative">
           <QRCode  logoImage={Logo} logoHeight={50} logoWidth={50} ecLevel="H" value={qrtext} color="#000" bgColor="#fff" size={300} 
            
            />
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Image alt="logo"  src={Logo} width={50} height={50} />
            </div>
           </div>
            <div className="left column text-center">
        <h2 className="capitalize bold text-lg">generate qr code</h2>
        <input onChange={(text)=> {
            changeqrtext(text.target.value);
        }} className="p-2 border-2 focus:border-2 border-green rounded-lg w-full" type="text" placeholder="enter number or text "/>
        <button onClick={()=> {
            handleimage();
        }} className="flex gap-2 justify-center items-center bg-green w-full p-2 rounded-lg shadow-lg mt-1 text-white cursor-pointer">
        <MdOutlineSaveAlt size={24} />
        save qr
        </button>
        </div>
    </div>
}
export default QrGenerator;