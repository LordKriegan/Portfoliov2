import React from 'react';
import { ProjectImage } from './';
import ReactFilestack from 'filestack-react';

const Images = (props) => {
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
                            <ProjectImage style={{ flex: "1 0 21%" }} key={i} image={elem} removeImg={() => props.removeImg(i)} />
                        )
                    }) : ""}
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-12 text-center">
                <ReactFilestack
                    apikey="A1HD3At9LTJ6SPmsQpgBaz"
                    buttonText="Add Images"
                    buttonClass="btn btn-outline-secondary"
                    options={{
                        accept: 'image/*',
                        fromSources: ["local_file_system"],
                        maxFiles: 20,
                        storeTo: {
                            location: 's3',
                        },
                    }}
                    onSuccess={props.addImages}
                    preload={true}
                />
            </div>
        </div>
    </>)
}

export default Images;