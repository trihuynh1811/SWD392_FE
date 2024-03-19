import React from 'react';

const PreviewFile = ({ file, width, height, className, displayPosition }) => {

    const [preview, setPreview] = React.useState(null);

    const reader = new FileReader();

    reader.readAsDataURL(file);

    function isFileImage(file) {
        return file && file['type'].split('/')[0] === 'image';
    }

    reader.onload = () => {

        setPreview(isFileImage(file) ? reader.result : "/default.svg");

    };

    return (
        <div className={displayPosition}>
            <img src={preview} className={className} alt="Preview" style={{ height: height, width: width }} />
        </div>
    )

}

export default PreviewFile