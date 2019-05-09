import React from 'react';
import Gallery from './Gallery';
import Lightbox from 'react-images';

class LightBox extends React.Component {
  constructor() {
    super();
    this.state = { currentImage: 0 };
    this.closeLightbox = this.closeLightbox.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
  }
  openLightbox(event, obj) {
    this.setState({
      currentImage: obj.index,
      lightboxIsOpen: true,
    });
  }
  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    });
  }
  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  }
  gotoNext() {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  }
  render() {
    const photosArr = [
      {
        "src": "https://live.staticflickr.com/7883/33722591428_2c9b9a1334.jpg",
        // "src": "https://res.cloudinary.com/trinhdan555/image/upload/c_scale,h_1743,q_auto:best,w_1224/v1557320565/IMG_0160_od8nhs.jpg",
        "width": 1600,
        "height": 1065,
        "title": "DSC01419",
        "alt": "DSC01419",
        "key": "33722591428",
        "sizes": "(min-width: 480px) 50vw, (min-width: 1024px) 33.3vw, 100vw"
      },
      {
        "src": "https://res.cloudinary.com/trinhdan555/image/upload/v1557320562/IMG_0639.JPG_jkthul.jpg",
        "width": 1600,
        "height": 1065,
        "title": "DSC01416",
        "alt": "DSC01416",
        "key": "47546659602",
        "sizes": "(min-width: 480px) 50vw, (min-width: 1024px) 33.3vw, 100vw"
      },
      {
        "src": "https://live.staticflickr.com/7883/33722591428_2c9b9a1334.jpg",
        // "src": "https://res.cloudinary.com/trinhdan555/image/upload/c_scale,h_1743,q_auto:best,w_1224/v1557320565/IMG_0160_od8nhs.jpg",
        "width": 1600,
        "height": 1065,
        "title": "DSC01419",
        "alt": "DSC01419",
        "key": "33722591428",
        "sizes": "(min-width: 480px) 50vw, (min-width: 1024px) 33.3vw, 100vw"
      },
      {
        "src": "https://res.cloudinary.com/trinhdan555/image/upload/v1557320562/IMG_0639.JPG_jkthul.jpg",
        "width": 1600,
        "height": 1065,
        "title": "DSC01416",
        "alt": "DSC01416",
        "key": "47546659602",
        "sizes": "(min-width: 480px) 50vw, (min-width: 1024px) 33.3vw, 100vw"
      },
    ]
    return (
      <div className="topPadding">
        {/*<Gallery photos={this.props.photos} onClick={this.openLightbox}/>*/}
        <Gallery photos={photosArr} onClick={this.openLightbox}/>
        <Lightbox
          theme={{ container: { background: 'rgba(0, 0, 0, 0.85)' } }}
          // images={this.props.photos.map(x => ({ ...x, srcset: x.srcSet, caption: x.title }))}
          images={photosArr.map(x => ({ ...x, srcset: x.srcSet, caption: x.title }))}
          backdropClosesModal={true}
          onClose={this.closeLightbox}
          onClickPrev={this.gotoPrevious}
          onClickNext={this.gotoNext}
          currentImage={this.state.currentImage}
          isOpen={this.state.lightboxIsOpen}
          width={1600}
        />
      </div>
    );
  }
}

export default LightBox;
