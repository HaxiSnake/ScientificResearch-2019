var dispatch_form="";
var dispatch_div="";
var origin;
$(function(){
  $('#dispatch_form .btn').each(function(){
    $(this).click(function(){
      $("#dispatch_error_message").empty();
      dispatch_form = $(this).parents("form");
      page = $(dispatch_form).parent().find(".disabled").attr("value");
      dispatch_div = $(dispatch_form).parent().find(".dispatch_paginator");
      Dajaxice.adminStaff.Dispatch(Dispatch_callback,{'form':$(dispatch_form).serialize(true),'identity':$(this).attr("id"),'page':page,'search_form':$(dispatch_div).parent().find("#search_form").serialize(true)});
    })
  })
  $('#search_form .btn').each(function(){
    $(this).click(function(){
      dispatch_form = $(this).parents("form");
      page = $(dispatch_form).parent().find(".disabled").attr("value");
      dispatch_div = $(dispatch_form).parent().find(".dispatch_paginator");
      ids = $(dispatch_div).attr("id").split('_');
      Dajaxice.adminStaff.DispatchPagination(DispatchPaginationCallback,{'page':page, 'identity':ids[1], 'search_form':$(dispatch_div).parent().find("#search_form").serialize(true)});
    })
  })
})
$(document).on("click",".dispatch_paginator .item_page",function(){
      dispatch_div = $(this).parents(".dispatch_paginator");
      page = $(this).attr("arg");
      ids = $(dispatch_div).attr("id").split('_');
      Dajaxice.adminStaff.DispatchPagination(DispatchPaginationCallback,{'page':page, 'identity':ids[1], 'search_form':$(dispatch_div).parent().find("#search_form").serialize(true)});
})

$(document).on("click","table .btn-danger",function(){
  username=$(this).parent().parent().children(0).html();
  dispatch_div = $(this).parents(".dispatch_paginator");
  page = $(dispatch_div).find(".disabled").attr("value");
  Dajaxice.adminStaff.DispatchDelete(DispatchDelete_callback,{'username':username,'identity':$(dispatch_div).attr("id").split("_")[1],'page':page, 'search_form':$(dispatch_div).parent().find("#search_form").serialize(true)});
})
function DispatchDelete_callback(data){
  if (data.status == "1"){
    $(dispatch_div).html(data.table);
  }
  alert(data.message);
}
function DispatchPaginationCallback(data){
  $(dispatch_div).html(data.html);
}
function Dispatch_callback(data){
  if (data.status == "1"){
    // if success all field background turn into white
    $.each(data.field,function(i,item){
      object = $(dispatch_form).find('#'+item);
      object.css("background","white");
    });
    $(dispatch_div).html(data.table);
  }else{
    $.each(data.field,function(i,item){
       object = $(dispatch_form).find('#'+item);
       object.css("background","white");
    });
    //error field background turn into red
    $.each(data.error_id,function(i,item){
       object = $(dispatch_form).find('#'+item);
       object.css("background","red");
    });
  }
  alert(data.message);
}

$(document).on("click",".btn_modify",function(){
  origin=$(this).parent().parent().children(0).html();
  $(".text_username").val(origin);
  $(".text_email").val($(this).parent().parent().children('td').eq(1).text());
  $(".text_name").val($(this).parent().parent().children('td').eq(2).text());
})
$(document).on("click",".btn_modify_college",function(){
  origin=$(this).parent().parent().children(0).html();
  $(".text_username_college").val(origin);
  $(".text_email_college").val($(this).parent().parent().children('td').eq(1).text());
  $(".text_name_college").val($(this).parent().parent().children('td').eq(2).text());
})
$(document).on("click",".btn_modify_expert",function(){
  origin = $(this).parent().parent().children('td').eq(0).text();
  $(".text_username_expert").val(origin);
  $(".text_email_expert").val($(this).parent().parent().children('td').eq(1).text());
  $(".text_name_expert").val($(this).parent().parent().children('td').eq(2).text());
  $(".text_college_expert").val($(this).parent().parent().children('td').eq(3).text());
   
})

$(document).on("click",".btn_save",function(){
  username=$(".text_username").val();
  name = $(".text_name").val();
  email = $(".text_email").val();
  college = $(".college").val();

  Dajaxice.adminStaff.ModifyInfomation(ModifyInfomation_callback,{'origin':origin,
                                                              'username':username,
                                                              'name':name,
                                                              'college':college,
                                                              'email':email});
})
$(document).on("click",".btn_save_college",function(){
  username=$(".text_username_college").val();
  name = $(".text_name_college").val();
  email = $(".text_email_college").val();
  college = $(".college_college").val();
  Dajaxice.adminStaff.ModifyInfomationCollege(ModifyInfomationCollege_callback,{'origin':origin,
                                                                                'username':username,
                                                                                'name':name,
                                                                                'college':college,
                                                                                'email':email});
})
function ModifyInfomationCollege_callback(data){
  if (data.status == "1"){
    alert("修改成功");
    window.location.reload();
  }

  else
  {
    alert("修改失败");
  }
}



$(document).on("click",".btn_modify_teacher",function(){
  origin = $(this).parent().parent().children('td').eq(0).text();
  $(".text_username_teacher").val(origin);
  $(".text_email_teacher").val($(this).parent().parent().children('td').eq(1).text());
  $(".text_name_teacher").val($(this).parent().parent().children('td').eq(2).text());
  $(".text_college_teacher").val($(this).parent().parent().children('td').eq(3).text());
   
})

$(document).on("click",".btn_save_expert",function(){
  username=$(".text_username_expert").val();
  name = $(".text_name_expert").val();
  email = $(".text_email_expert").val();
  college = $(".text_college_expert").val();
  Dajaxice.adminStaff.ModifyInformationExpert(ModifyInformationExpert_callback,{'origin':origin,
                                                                                'username':username,
                                                                                'name':name,
                                                                                'college':college,
                                                                                'email':email});
})
function ModifyInformationExpert_callback(data){
  if (data.status == "1"){
    alert("修改成功");
    window.location.reload();
  }

  else   
  {
    alert("修改失败，请检查学院名称");
  }
}
function ModifyInfomation_callback(data){
  if (data.status == "1"){
    alert("修改成功");
    window.location.reload();
  }

  else
  {
    alert("修改失败");
  }
}

$(document).on("click",".btn_save_teacher",function(){
  username=$(".text_username_teacher").val();
  name = $(".text_name_teacher").val();
  email = $(".text_email_teacher").val();
  college = $(".text_college_teacher").val();

  Dajaxice.adminStaff.ModifyInformationTeacher(ModifyInformationTeacher_callback,{'origin':origin,
                                                                                'username':username,
                                                                                'name':name,
                                                                                'college':college,
                                                                                'email':email});
})
function ModifyInformationTeacher_callback(data){
  if (data.status == "1"){
    alert("修改成功");
    window.location.reload();
  }

  else   
  {
    alert("修改失败，请检查学院名称");
  }
}