import './App.css';
import Avatar from './Avatar/Avatar';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './Home/Home';
import Headphones from './Headphones/Headphones';
import Details from './Details/Details';
import Cart from './Cart/Cart';
import Signin from './Signin/Signin';
import { useState,createContext, useEffect } from 'react';
import Checkout from './Checkout/Checkout';

export const wholeContext = createContext();

function App() {
  const [cartData,setCartData] = useState([]);
  const [flag,setflag]=useState(false);
  const [user,setUser]=useState('');
  useEffect(() => {},[cartData])
  const location = useLocation();
  const path = location.pathname;
  const headphones = [{
    link : 'xx99II',
    img : '/assets/product-xx99-mark-two-headphones/desktop/image-category-page-preview.jpg',
    new : true ,
    title : "XX99 MARK II",
    br : "HEADPHONES",
    desc : 'The new XX99 Mark II headphones is the pinnacle of pristine audio. It redefines your premium headphone experience by reproducing the balanced depth and precision of studio-quality sound.',
  },
  {
    link:'xx99I',
    img : '/assets/product-xx99-mark-one-headphones/desktop/image-category-page-preview.jpg',
    new : false ,
    title : "XX99 MARK I",
    br : "HEADPHONES",
    desc : 'As the gold standard for headphones, the classic XX99 Mark I offers detailed and accurate audio reproduction for audiophiles, mixing engineers, and music aficionados alike in studios and on the go.',
  },
  {
    link:'xx59',
    img : '/assets/product-xx59-headphones/desktop/image-category-page-preview.jpg',
    new : false ,
    title : "XX59",
    br : "HEADPHONES",
    desc : 'Enjoy your audio almost anywhere and customize it to your specific tastes with the XX59 headphones. The stylish yet durable versatile wireless headset is a brilliant companion at home or on the move.',
  }]
  const Speakers = [
    {
      link:'zx9',
      img : '/assets/product-zx9-speaker/desktop/image-category-page-preview.jpg',
      new : true ,
      title : "ZX9",
      br : "SPEAKER",
      desc : 'Upgrade your sound system with the all new ZX9 active speaker. It’s a bookshelf speaker system that offers truly wireless connectivity -- creating new possibilities for more pleasing and practical audio setups.',
    },
    {
      link:'zx7',
      img : '/assets/product-zx7-speaker/desktop/image-category-page-preview.jpg',
      new : false ,
      title : "ZX7",
      br : "SPEAKER",
      desc : 'Stream high quality sound wirelessly with minimal loss. The ZX7 bookshelf speaker uses high-end audiophile components that represents the top of the line powered speakers for home or studio use.',
    }
  ]
  
  const earphone = [
    {
      link:'yx1',
      img : '/assets/product-yx1-earphones/desktop/image-category-page-preview.jpg',
      new : true ,
      title : "YX1 WIRELESS",
      br : "EARPHONE",
      desc : 'Tailor your listening experience with bespoke dynamic drivers from the new YX1 Wireless Earphones. Enjoy incredible high-fidelity sound even in noisy environments with its active noise cancellation feature.', 
    }
  ]

  const details = [
    {
      link : 'xx99II',
      img : '/assets/product-xx99-mark-two-headphones/desktop/image-category-page-preview.jpg',
      new : true ,
      title : "XX99 MARK II",
      rate:'$2,999',
      br : "HEADPHONES",
      desc : 'The new XX99 Mark II headphones is the pinnacle of pristine audio. It redefines your premium headphone experience by reproducing the balanced depth and precision of studio-quality sound.',
      feature1:'Featuring a genuine leather head strap and premium earcups, these headphones deliver superior comfort for those who like to enjoy endless listening. It includes intuitive controls designed for any situation. Whether you’re taking a business call or just in your own personal space, the auto on/off and pause features ensure that you’ll never miss a beat.',
      feature2:'The advanced Active Noise Cancellation with built-in equalizer allow you to experience your audio world on your terms. It lets you enjoy your audio in peace, but quickly interact with your surroundings when you need to. Combined with Bluetooth 5. 0 compliant connectivity and 17 hour battery life, the XX99 Mark II headphones gives you superior sound, cutting-edge technology, and a modern design aesthetic.',
      box:[['1x','Headphone Unit'],['2x','Replacement Earcups'],['1x','User Manual'],['1x','3.5mm 5mm Audio Cable'],['1x','Travel Bag']],
      img1:'/assets/product-xx99-mark-two-headphones/desktop/image-gallery-1.jpg',
      img2:'/assets/product-xx99-mark-two-headphones/desktop/image-gallery-2.jpg',
      img3:'/assets/product-xx99-mark-two-headphones/desktop/image-gallery-3.jpg',
    },
    {
      link:'xx99I',
      img : '/assets/product-xx99-mark-one-headphones/desktop/image-category-page-preview.jpg',
      new : false ,
      title : "XX99 MARK I",
      rate:'$1,750',
      br : "HEADPHONES",
      desc : 'As the gold standard for headphones, the classic XX99 Mark I offers detailed and accurate audio reproduction for audiophiles, mixing engineers, and music aficionados alike in studios and on the go.',
      feature1:'As the headphones all others are measured against, the XX99 Mark I demonstrates over five decades of audio expertise, redefining the critical listening experience. This pair of closed-back headphones are made of industrial, aerospace-grade materials to emphasize durability at a relatively light weight of 11 oz.',
      feature2:'From the handcrafted microfiber ear cushions to the robust metal headband with inner damping element, the components work together to deliver comfort and uncompromising sound. Its closed-back design delivers up to 27 dB of passive noise cancellation, reducing resonance by reflecting sound to a dedicated absorber. For connectivity, a specially tuned cable is included with a balanced gold connector.',
      box:[['1x','Headphone Unit'],['1x','Replacement Earcups'],['1x','User Manual'],['1x','3.5mm 5mm Audio Cable']],
      img1:'/assets/product-xx99-mark-one-headphones/desktop/image-gallery-1.jpg',
      img2:'/assets/product-xx99-mark-one-headphones/desktop/image-gallery-2.jpg',
      img3:'/assets/product-xx99-mark-one-headphones/desktop/image-gallery-3.jpg',
    },
    {
      link:'xx59',
      img : '/assets/product-xx59-headphones/desktop/image-category-page-preview.jpg',
      new : false ,
      title : "XX59",
      rate:'$899',
      br : "HEADPHONES",
      desc : 'Enjoy your audio almost anywhere and customize it to your specific tastes with the XX59 headphones. The stylish yet durable versatile wireless headset is a brilliant companion at home or on the move.',
      feature1:'These headphones have been created from durable, high-quality materials tough enough to take anywhere. Its compact folding design fuses comfort and minimalist style making it perfect for travel. Flawless transmission is assured by the latest wireless technology engineered for audio synchronization with videos.',
      feature2:'More than a simple pair of headphones, this headset features a pair of built-in microphones for clear, hands-free calling when paired with a compatible smartphone. Controlling music and calls is also intuitive thanks to easy-access touch buttons on the earcups. Regardless of how you use the XX59 headphones, you can do so all day thanks to an impressive 30-hour battery life that can be rapidly recharged via USB-C.',
      box:[['1x','Headphone Unit'],['2x','Replacement Earcups'],['1x','User Manual'],['1x','3.5mm 5mm Audio Cable']],
      img1:'/assets/product-xx59-headphones/desktop/image-gallery-1.jpg',
      img2:'/assets/product-xx59-headphones/desktop/image-gallery-2.jpg',
      img3:'/assets/product-xx59-headphones/desktop/image-gallery-3.jpg',
    },
    {
      link:'zx9',
      img : '/assets/product-zx9-speaker/desktop/image-category-page-preview.jpg',
      new : true ,
      title : "ZX9",
      rate:'$4,500',
      br : "SPEAKER",
      desc : 'Upgrade your sound system with the all new ZX9 active speaker. It’s a bookshelf speaker system that offers truly wireless connectivity -- creating new possibilities for more pleasing and practical audio setups.',
      feature1:'Connect via Bluetooth or nearly any wired source. This speaker features optical, digital coaxial, USB Type-B, stereo RCA, and stereo XLR inputs, allowing you to have up to five wired source devices connected for easy switching. Improved bluetooth technology offers near lossless audio quality at up to 328ft (100m).',
      feature2:'Discover clear, more natural sounding highs than the competition with ZX9’s signature planar diaphragm tweeter. Equally important is its powerful room-shaking bass courtesy of a 6.5” aluminum alloy bass unit. You’ll be able to enjoy equal sound quality whether in a large room or small den. Furthermore, you will experience new sensations from old songs since it can respond to even the subtle waveforms.',
      box:[['2x','Speaker Unit'],['2x','Speaker Cloth Panel'],['1x','User Manual'],['1x','3.5mm 10mm Audio Cable'],['1x','10m Optical Cable']],
      img1:'/assets/product-zx9-speaker/desktop/image-gallery-1.jpg',
      img2:'/assets/product-zx9-speaker/desktop/image-gallery-2.jpg',
      img3:'/assets/product-zx9-speaker/desktop/image-gallery-3.jpg',
    },
    {
      link:'zx7',
      img : '/assets/product-zx7-speaker/desktop/image-category-page-preview.jpg',
      new : false ,
      title : "ZX7",
      rate:'$3,500',
      br : "SPEAKER",
      desc : 'Stream high quality sound wirelessly with minimal loss. The ZX7 bookshelf speaker uses high-end audiophile components that represents the top of the line powered speakers for home or studio use.',
      feature1:'Reap the advantages of a flat diaphragm tweeter cone. This provides a fast response rate and excellent high frequencies that lower tiered bookshelf speakers cannot provide. The woofers are made from aluminum that produces a unique and clear sound. XLR inputs allow you to connect to a mixer for more advanced usage.',
      feature2:'The ZX7 speaker is the perfect blend of stylish design and high performance. It houses an encased MDF wooden enclosure which minimises acoustic resonance. Dual connectivity allows pairing through bluetooth or traditional optical and RCA input. Switch input sources and control volume at your finger tips with the included wireless remote. This versatile speaker is equipped to deliver an authentic listening experience.',
      box:[['2x','Speaker Unit'],['2x','Speaker Cloth Panel'],['1x','User Manual'],['1x','3.5mm 7.5mm Audio Cable'],['1x','7.5m Optical Cable']],
      img1:'/assets/product-zx7-speaker/desktop/image-gallery-1.jpg',
      img2:'/assets/product-zx7-speaker/desktop/image-gallery-2.jpg',
      img3:'/assets/product-zx7-speaker/desktop/image-gallery-3.jpg',
    },
    {
      link:'yx1',
      img : '/assets/product-yx1-earphones/desktop/image-category-page-preview.jpg',
      new : true ,
      title : "YX1 WIRELESS",
      rate:'$599',
      br : "EARPHONE",
      desc : 'Tailor your listening experience with bespoke dynamic drivers from the new YX1 Wireless Earphones. Enjoy incredible high-fidelity sound even in noisy environments with its active noise cancellation feature.', 
      feature1:'Experience unrivalled stereo sound thanks to innovative acoustic technology. With improved ergonomics designed for full day wearing, these revolutionary earphones have been finely crafted to provide you with the perfect fit, delivering complete comfort all day long while enjoying exceptional noise isolation and truly immersive sound.',
      feature2:'The YX1 Wireless Earphones features customizable controls for volume, music, calls, and voice assistants built into both earbuds. The new 7-hour battery life can be extended up to 28 hours with the charging case, giving you uninterrupted play time. Exquisite craftsmanship with a splash resistant design now available in an all new white and grey color scheme as well as the popular classic black.',
      box:[['2x','Earphone Unit'],['2x','Multi-size Earplugs'],['1x','User Manual'],['1x','USB-C Charging Cable'],['1x','Travel Pouch']],
      img1:'/assets/product-yx1-earphones/desktop/image-gallery-1.jpg',
      img2:'/assets/product-yx1-earphones/desktop/image-gallery-2.jpg',
      img3:'/assets/product-yx1-earphones/desktop/image-gallery-3.jpg',
    }
  ]
  return (
    <div className="App">
      <wholeContext.Provider value={{cartData,setCartData}}>
      {!path.includes('sign')  ?<Header user={user} />:null }
      {!path.includes('sign') && !path.includes('checkout')  ?<Cart />:null }
      <Routes>
          <Route path='/Signin' element={<Signin user={setUser} flag={setflag}/>}/>
          <Route path='/Home' element={<Home user={user}/>}/>
          <Route path='/Headphones' element={<Headphones user={user} obj ={headphones} category='HEADPHONES'/>}/>
          <Route path='/Speakers' element={<Headphones user={user} obj ={Speakers} category='SPEAKERS'/>}/>
          <Route path='/Earphones' element={<Headphones user={user} obj ={earphone} category='EARPHONES'/>}/>
          <Route path='/Details' element={<Details user={user} details={details}/>}/>
          <Route path='/checkout' element={<Checkout user={user} details={details} />}/>
      </Routes>
      </wholeContext.Provider>
      {!path.includes('sign') && !path.includes('checkout')  ?<Avatar user={user} />:null }
      {!path.includes('sign')  ?<Footer user={user} />:null }
    </div>
  );
}

export default App;
