import React, {Component} from 'react';
import axios from 'axios';
import fs from 'fs';

export default class Upload extends Component {
    preview_images = [];

    constructor(props) {
        super(props);
        
        this.state = {
            part_number: '',
            part_specs: '',
            submitter: '',

            selectedFiles: null,
            previews: null 
        }
    }

    render() {
        let $imagePreview = null;
        if (this.state.previews)  {
            let imgs_src = [];

            for(let i = 0; i < this.state.previews.length; i++) {
                imgs_src[i] = (<img src={this.state.previews[i]} width="200" height="200" alt="preview"/>)   
            }
            $imagePreview = imgs_src;
        }

        return (
            <div style={{marginTop: 10}}>
                <form onSubmit={this.onSubmitHandler}>
                    <div className="form-group"> 
                        <label>Part Number: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.part_number}
                                onChange={this.partNumberHandler}
                        />
                    </div>
                    <div className="form-group"> 
                        <label>Part Specs: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.part_specs}
                                onChange={this.partSpecsHandler}
                        />
                    </div>
                    <div className="form-group"> 
                        <label>Submitter: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.submitter}
                                onChange={this.submitterHandler}
                        />
                    </div>

                    <input className="form-group" type='file' onChange={this.fileUploadHandler}/>
                    <div className="form-group">
                        <input type="submit" value="Upload Parts" className="btn btn-primary" />
                    </div>
                </form>
                <div className="imgPreview">
                    {$imagePreview}
                </div>
            </div>
        );
    }

    onSubmitHandler = event => {
        event.preventDefault();

        const parts = {
            part_number: this.state.part_number,
            part_specs: this.state.part_specs,
            submitter: this.state.submitter,
            files: this.state.selectedFiles,
        };
        
        axios.post('http://localhost:4000/mvparts/add', parts).then(res => console.log(res.data));

        this.setState({
            part_number: '',
            part_specs: '',
            submitter: '',

            selectedFiles: null,
            previews: null 
        });
    }

    submitterHandler = event => {
        this.setState({
            submitter: event.target.value
        });
    }

    partSpecsHandler = event => {
        this.setState({
            part_specs: event.target.value
        });
    }

    partNumberHandler = event => {
        this.setState({
            part_number: event.target.value
        });
    }

    fileUploadHandler = event => {
        for(let i = 0; i < event.target.files.length; i++) {
            this.preview_images[i] = URL.createObjectURL(event.target.files[i]);
        }

        this.setState({
            selectedFiles: event.target.files,
            previews: this.preview_images
        });
    }
}