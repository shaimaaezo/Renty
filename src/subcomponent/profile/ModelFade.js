import '../../component/profile/profile.css'

const ModelFade = () => {
    return (
        <>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Profile</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group row">
                                    <div className="col">
                                        <input type="text" className="form-control" placeholder="First name" />
                                    </div>
                                    <div className="col">
                                        <input type="text" className="form-control" placeholder="Last name" />
                                    </div>
                                </div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text"><i className="bi bi-envelope"></i></div>
                                    </div>
                                    <input type="text" className="form-control" placeholder="Email" />
                                </div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text"><i className="bi bi-lock"></i></div>
                                    </div>
                                    <input type="password" className="form-control" placeholder="Password" />
                                </div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text"><i className="bi bi-telephone"></i></div>
                                    </div>
                                    <input type="password" className="form-control" placeholder="Phone number" />
                                </div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text"><i className="bi bi-geo-alt"></i></div>
                                    </div>
                                    <input type="text" className="form-control" placeholder="Address" />
                                </div>
                                <div className="form-group img-form">
                                    <div className="">
                                        <input type="file" name="img[]" className="input-file" />
                                        <div className="input-group col-xs-12">
                                            <span className="input-group-btn">
                                                <button className="upload-field btn btn-upload-profile" type="button"><i className="bi bi-cloud-arrow-up"></i> Browse</button>
                                            </span>
                                            <input type="text" className="form-control" disabled placeholder="Upload Image" />

                                        </div>
                                    </div>
                                </div>
                                <div className="form-group align-text-left">
                                    <label htmlFor="exampleFormControlTextarea1 float-left">About</label>
                                    <textarea className="form-control" rows="2"></textarea>
                                </div>




                                <button type="submit" className="btn btn-edit-form">Save Changes <i className="bi bi-check2"></i></button>

                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </>

    );
}


export default ModelFade;