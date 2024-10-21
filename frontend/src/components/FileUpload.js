import React, { useState } from 'react';

const FileUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setUploadStatus('파일을 선택해주세요.');
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = await fetch('http://localhost:3000/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                setUploadStatus(`업로드 성공! 파일 URL: ${data.fileUrl}`);
            } else {
                setUploadStatus('업로드 실패!');
            }
        } catch (error) {
            console.error('업로드 오류:', error);
            setUploadStatus('업로드 중 오류 발생!');
        }
    };

    return (
        <div>
            <h2>파일 업로드</h2>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>업로드</button>
            {uploadStatus && <p>{uploadStatus}</p>}
        </div>
    );
};

export default FileUpload;
