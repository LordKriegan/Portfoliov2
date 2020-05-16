import React from 'react';
import { ProjectImage } from './';
import axios from 'axios';

const Images = (props) => {
    const onChangeHandler = (e) => {
        const file = e.target.files[0];
        console.log("=======",file, file.name, file.type,"=======")
        axios
            .get(`/api/bucket/sign-s3?fileName=${encodeURIComponent(file.name)}&fileType=${encodeURIComponent(file.type)}`)
            .then(signedResponse => {
                axios
                .put(signedResponse.data.signedRequest, file, {    
                    headers: {
                    'Content-Type': file.type,
                    'x-amz-acl': 'public-read'
                  }
                })
                .then(response => {
                    console.log("upload successful");
                    props.addImages([{imageLink: signedResponse.data.url, id: "NEW_IMAGE"}]);
                })
                .catch(error => console.error(error));
            })
            .catch(error => console.error(error));
    }
    return (<>
        <div className="row">
            <div className="col-12">
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "center"
                }}>
                    {(props.images.length) ? props.images.map((elem, i) => {
                        return (
                            <ProjectImage style={{ flex: "1 0 21%" }} key={i} image={elem.imageLink} removeImg={() => props.removeImg(i, "manual")} />
                        )
                    }) : ""}
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-12 text-center">
                <div id="inputContainer">
                    <input accept="image/*" id="uploadFile" type="file" onChange={onChangeHandler}/>
                    <div id="dragbox"><p id="dragboxmsg">Drag and drop a file to upload!</p></div>
                </div>
            </div>
        </div>
    </>)
}

export default Images;