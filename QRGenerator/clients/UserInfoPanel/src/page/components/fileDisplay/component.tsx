import { useEffect, useState, useCallback } from 'react';
import { FileInfo, UserInfo } from '@src/interfaces';
import './style.css';
import { getMimeType } from './utils/getMimeType';

interface FileDisplayProps {
    mediaInfo: UserInfo;
}

const FileDisplay = ({ mediaInfo }: FileDisplayProps) => {
    const [fileUrl, setFileUrl] = useState('');
    const [fileName, setFileName] = useState('');
    const [fileType, setFileType] = useState('');


    // Memoized function to handle the file display logic
    const displayFile = useCallback(async (file: FileInfo) => {
        
        try {
            if (file.filePath && typeof file.filePath === 'string') {
                const timestamp = new Date().getTime(); // Unique timestamp
                const url = `${import.meta.env.VITE_ENV_SERVER_URL}/api/user/getFile/${encodeURI(file.filePath.replace(/\\\\/g, '/'))}?t=${timestamp}`;
                const mimeType = await getMimeType(file.fileName);
                setFileUrl(url);
                setFileType(mimeType);
                setFileName(file.fileName);
            }
        } catch (error) {
            console.error('Error fetching file:', error);
            setFileUrl('');
            setFileType('');
        }
    }, []);

    // Effect to trigger displayFile when mediaInfo updates
    useEffect(() => {
        if (mediaInfo.info.img) {
            const parsedData = JSON.parse(mediaInfo.info.img); 
            displayFile(parsedData);
        }
    }, [mediaInfo, displayFile]);

    // Function to determine how to display the file
    const renderFile = () => {

        if (RegExp(/image\/(jpeg|jpg|gif|png)$/).exec(fileType)) {
            return (
                <img
                    key={fileUrl} // Adding key to force re-render
                    src={fileUrl}
                    alt={fileName}
                    crossOrigin='anonymous'
                    className='imageElement'
                />
            );
        }

        return (
            <div key={mediaInfo.id}>
                File type not supported for preview. <a href={fileUrl}>{fileName}</a>
            </div>
        );
    };

    return (
        <div className='displayBox'>
            {renderFile()}
        </div>
    );
};

export default FileDisplay;
