import React, { useState } from 'react';
import '../styles/modal.css';
import { FaGithub, FaFacebook, FaInstagramSquare, FaGoogle, FaLinkedin, FaTwitter, FaCodepen, FaGitlab } from "react-icons/fa";
import { validateURL } from "../helpers/validation";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useAuth } from '../contexts/auth';
import BeatLoader from "react-spinners/BeatLoader";

const Modal = ({ show, onClose, children }) => {
  const { loading, setLoading, getCurrentUser,flag, setFlag } = useAuth();
  const id = getCurrentUser()._id;
  const platformTypes = [
    { name: 'GitHub', Icon: FaGithub },
    { name: 'LinkedIn', Icon: FaLinkedin },
    { name: 'Facebook', Icon: FaFacebook },
    { name: 'Twitter', Icon: FaTwitter },
    { name: 'Instagram', Icon: FaInstagramSquare },
    { name: 'Codepen', Icon: FaCodepen },
    { name: 'Google', Icon: FaGoogle },
    { name: 'GitLab', Icon: FaGitlab }
  ];

  const [errorMsg, setErrorMsg] = useState('');
  const [addLink, setAddLink] = useState({
    platformName: '',
    Url: ''
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setAddLink({ ...addLink, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { platformName, Url } = addLink;

    if (!platformName || !Url) {
      setErrorMsg("Please provide valid details to add a link.");
      return;
    }
    if (!validateURL(Url)) {
      setErrorMsg('Please provide a valid URL.');
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5555/links/addNewLink", { platformName: addLink.platformName, Url: addLink.Url, id: id });
      if (res.status === 200) {
        setAddLink({
          platformName: '',
          Url: ''
        });
        setErrorMsg('');
        setFlag(!flag);
        toast.success("Link added successfully!");
        onClose();
      } else {
        setErrorMsg("Failed to add link. Try again later.");
      }
    } catch (error) {
      console.error("Error occurred adding link", error);
      setErrorMsg("Error occurred. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">=Link#</h4>
          <button onClick={onClose} className="modal-close-button">&times;</button>
        </div>
        <div className="modal-body">
          {errorMsg && <p className="text-red-300">{errorMsg}</p>}
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col gap-y-2'>
              <label htmlFor="platform">Choose an option:</label>
              <select
                id="platform"
                name="platformName"
                className='py-2 pl-2 w-full border-2 rounded-md focus:outline-none hover:shadow-[0_0_10px_#4299e1] hover:border-blue-400 transition duration-200 delay-150'
                value={addLink.platformName}
                onChange={handleChange}
              >
                <option value="">Select Platform</option>
                {platformTypes.map((platform) => (
                  <option key={platform.name} value={platform.name}>
                    {platform.name}
                  </option>
                ))}
              </select>
            </div>
            <div className='flex flex-col gap-y-2 mt-3'>
              <label htmlFor='url'>Link</label>
              <input
                type='url'
                name='Url'
                placeholder='Copy & paste link here'
                value={addLink.Url}
                onChange={handleChange}
                className='w-full py-2 pl-2 border-2 rounded-md focus:outline-none hover:shadow-[0_0_10px_#4299e1] hover:border-blue-400 transition duration-200 delay-150'
              />
            </div>
            <div className='h-[1px] border-b-2 w-full my-6'></div>
            <button className="py-2 px-2 w-full bg-blue-400 rounded-md text-white" type="submit">
              {loading ? <BeatLoader color='skyblue' size="8px" /> : "Add Link"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
