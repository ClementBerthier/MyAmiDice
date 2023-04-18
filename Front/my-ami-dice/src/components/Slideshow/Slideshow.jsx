import React from "react";
import { Slide } from "react-slideshow-image";
import img1 from '../../assets/images/img1.png'
import img2 from '../../assets/images/img2.png'
import img3 from '../../assets/images/img3.png'
import img4 from '../../assets/images/img4.png'
import img5 from '../../assets/images/img5.png'
import img6 from '../../assets/images/img6.png'
import 'react-slideshow-image/dist/styles.css'
import './style.scss'

const properties = {
    duration: 5000,
    transitionDuration: 1000,
    infinite: true,
    indicator: true,
    arrow: true
}

const slideImages = [
    {
        name: img1,
        description: 'image1'
    },
    {
        name: img2,
        description: 'image2'
    },
    {
        name: img3,
        description: 'image3'
    },
    {
        name: img4,
        description: 'image4'
    },
    {
        name: img5,
        description: 'image5'
    },
    {
        name: img6,
        description: 'image6'
    }
]

function Slideshow() {
    return(
        <div className="containerSlide">
            <Slide {... properties}>
                {slideImages.map((picture, index) =>(
                    <div className="each-slide" key= {index}>
                        <div>
                            <img src={picture.name} alt={picture.description} />
                        </div>
                </div>
                ))}               
            </Slide>
        </div>       
    )
}

export default Slideshow;