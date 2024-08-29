const {sendResponse} = require('@handlers')
const { AdminQueries } = require("@queries");
const { dataFormatter } = require("@utils");


exports.rootAdminCheck = async(req,res,next)=>{
  const isAuth = req.session.isAuth;
  if(!isAuth){
    return sendResponse(res, 'Not Authorized...' , 'authorization', false, 401)
  }
  const queries = new AdminQueries();
  const response = await queries.getOne(req.session.adminId);
  const formattedData = await dataFormatter(response);
  if(formattedData && formattedData[0].info.role !== 'root'){
    return sendResponse(res, 'Only root access...' , 'authorization', false, 401)
  }else{
    next();    
  }
}

exports.adminCheck = async(req,res,next)=>{
  const isAuth = req.session.isAuth;
  if(!isAuth){
    return sendResponse(res, 'Not Authorized...' , 'authorization', false, 401)
  }

  next();
}