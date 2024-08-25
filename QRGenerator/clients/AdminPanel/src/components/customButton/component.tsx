import { useFormHook } from '@src/hooks';
import './style.css'
import { StyleProps } from '@src/interfaces';

interface CustomButtonProps {
  style: StyleProps;
  process: string;
  content: string;
  type: string;
  method: string;
  param: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ param, method, style, process, content, type }) => {
  const { functions: { handleSubmit } } = useFormHook();

  const handleClick = async() => {
    const commonData = { process: process, method: method, param: param, buttonType: type};
    
    handleSubmit(commonData);
  };
 

  

  return (
    <div className='text-center'>
      <button style={style} onClick={handleClick} type="submit" className="custom-button">
        {content}
      </button>
    </div>
  );
};

export default CustomButton;
