import http from "./http-common";

class UploadFilesService {
    urlUpload = 'upload'

    setUrlUpload($url){
        this.urlUpload = $url;
        return this;
    }

    upload(file, onUploadProgress) {
        let formData = new FormData();

        formData.append("file", file);

        return http.post(this.urlUpload, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            onUploadProgress
        });
    }

    getFiles() {
        return http.get("/files");
    }
}

export default new UploadFilesService();
