import { useFormHook } from '@src/hooks';
import './style.css'
import { StyleProps } from '@src/interfaces';
import { useAppSelector } from '@src/store/hook';
import { RootState } from '@src/store/store';

interface CustomButtonProps {
  style: StyleProps;
  process: string;
  content: string;
  type: string;
  method: string;
  param: string;
  inheritor: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({inheritor, param, method, style, process, content, type }) => {
  const { functions: { handleSubmit } } = useFormHook();
  const {loading} = useAppSelector((state:RootState)=>state.info.response)
  const handleClick = async() => {
    try{
      const commonData = { inheritor: inheritor, process: process, method: method, param: param, buttonType: type};
    
      handleSubmit(commonData)
  
    }catch(err){
      throw err;
    } finally{
      
      if(process === 'logout' && loading === false){
        window.location.reload();
      }
    }
    
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
