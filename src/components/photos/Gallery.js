import React from 'react';
import PropTypes from 'prop-types';
import ResizeObserver from 'resize-observer-polyfill';
import Photo, { photoPropType } from './Photo';
import { computeColumnLayout } from '../../layouts/columns';
import { computeRowLayout } from '../../layouts/justified';
import { findIdealNodeSearch } from '../../utils/findIdealNodeSearch';

class Gallery extends React.Component {
  state = {
    containerWidth: 0,
  };
  componentDidMount() {
    this.animationFrameID = null;
    this.observer = new ResizeObserver(entries => {
      // only do something if width changes
      const newWidth = entries[0].contentRect.width;
      if (this.state.containerWidth !== newWidth) {
        // put in an animation frame to stop "benign errors" from
        // ResizObserver https://stackoverflow.com/questions/49384120/resizeobserver-loop-limit-exceeded
        this.animationFrameID = window.requestAnimationFrame(() => {
          this.setState({ containerWidth: Math.floor(newWidth) });
        });
      }
    });
    this.observer.observe(this._gallery);
  }
  componentWillUnmount() {
    this.observer.disconnect();
    window.cancelAnimationFrame(this.animationFrameID);
  }
  handleClick = (event, { index }) => {
    const { photos, onClick } = this.props;
    onClick(event, {
      index,
      photo: photos[index],
      previous: photos[index - 1] || null,
      next: photos[index + 1] || null,
    });
  };

  render() {
    const { containerWidth } = this.state;
    // no containerWidth until after first render with refs, skip calculations and render nothing
    if (!containerWidth) return <div ref={c => (this._gallery = c)}>&nbsp;</div>;
    // subtract 1 pixel because the browser may round up a pixel
    const { margin, onClick, direction, photos } = this.props;
    const width = containerWidth - 1;
    let galleryStyle, thumbs;

    if (direction === 'row') {
      let { limitNodeSearch, targetRowHeight } = this.props;
      // allow user to calculate limitNodeSearch from containerWidth
      if (typeof limitNodeSearch === 'function') {
        limitNodeSearch = limitNodeSearch(containerWidth);
      }
      if (typeof targetRowHeight === 'function') {
        targetRowHeight = targetRowHeight(containerWidth);
      }
      // set how many neighboring nodes the graph will visit
      if (limitNodeSearch === undefined) {
        limitNodeSearch = 1;
        if (containerWidth >= 450) {
          limitNodeSearch = findIdealNodeSearch({ containerWidth, targetRowHeight });
        }
      }

      galleryStyle = { display: 'flex', flexWrap: 'wrap', flexDirection: 'row' };
      thumbs = computeRowLayout({ containerWidth: width, limitNodeSearch, targetRowHeight, margin, photos });
    }
    if (direction === 'column') {
      let { columns } = this.props;
      // allow user to calculate columns from containerWidth
      if (typeof columns === 'function') {
        columns = columns(containerWidth);
      }
      // set default breakpoints if user doesn't specify columns prop
      if (columns === undefined) {
        columns = 1;
        if (containerWidth >= 500) columns = 2;
        if (containerWidth >= 900) columns = 3;
        if (containerWidth >= 1500) columns = 4;
      }
      galleryStyle = { position: 'relative' };
      thumbs = computeColumnLayout({ containerWidth: width, columns, margin, photos });
      galleryStyle.height = thumbs[thumbs.length - 1].containerHeight;
    }

    const { renderImage: PhotoComponent = Photo } = this.props;
    return (
      <div className="react-photo-gallery--gallery">
        <div ref={c => (this._gallery = c)} style={galleryStyle}>
          {thumbs.map((photo, index) => {
            const { left, top, key, containerHeight, ...rest } = photo;
            return (
              <PhotoComponent
                key={photo.key || photo.src}
                margin={margin}
                index={index}
                photo={rest}
                direction={direction}
                left={left}
                top={top}
                onClick={onClick ? this.handleClick : null}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

Gallery.propTypes = {
  photos: PropTypes.arrayOf(photoPropType).isRequired,
  direction: PropTypes.string,
  onClick: PropTypes.func,
  columns: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  targetRowHeight: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  limitNodeSearch: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  margin: PropTypes.number,
  renderImage: PropTypes.func,
};

Gallery.defaultProps = {
  margin: 2,
  direction: 'row',
  targetRowHeight: 300,
};
export { Photo };
export default Gallery;
