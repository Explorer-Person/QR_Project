const {sendResponse} = require('@handlers')
const express = require('express');
const middleware = express(); 
const { AdminQueries } = require("@queries");
const { dataFormatter } = require("@utils");


middleware.use('/api/authorize', async function(req,res,next){
  const isAuth = req.session.isAuth;
  if(!isAuth){
    return sendResponse(res, 'Cannot authorized', 'authorization', false, 401)
  }
  const queries = new AdminQueries();
  const response = await queries.getOne(req.session.adminId);
  const formattedData = dataFormatter(response);

  sendResponse(res, {access:formattedData[0].info.role, authorized: 'success'}, 'authorization', true, 200);
})

module.exports = middleware; 
