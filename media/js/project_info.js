var judgeid,userrole,userstatus,projectstatus,applicationstatus_s,applicationstatus_c,finalstatus;
var search=0;
var glo_project_id;
$("[name='not_pass_reason']").hide();
$("#not_pass_article").hide();
$("#budget").hide();
// $(".skip_choice").hide();
$("[name='judgeresult']").css("color","gray");
$(document).on("change","[name='judgeresult']",function()
{
    
    if($(this).val()=="-1")
    {
        $(this).css("color","gray");
    }
    else
    {

        
        $(this).css("color","black");
    }
    if($(this).val()=="0")
    {
        $("[name='not_pass_reason']").show(500);
        if(projectstatus==applicationstatus_s||projectstatus==applicationstatus_c||projectstatus==finalstatus){
        
        }
        $("#not_pass_article").show(500);
        $("#budget").hide(500);
        $(".skip_choice").hide(500);
    }
    else if($(this).val()=="1")
    {
        $(".skip_choice").show(500);
        $("#id_skip_judge_1").prop("checked",true);
        $("#budget").show(500);
        $("[name='not_pass_reason']").hide(500);
        $("#not_pass_article").hide(500);
    }
    if($(this).val()=="-1")
    {
        $(".skip_choice").hide(500);
    }

});
Dajaxice.common.getStatus(function(data){
    applicationstatus_s=data.application_s;
    applicationstatus_c=data.application_c;
    finalstatus=data.final;
},{});

$(document).on("click","[name='changestatus']",function(){
    judgeid=$(this).closest("tr").attr("iid");
    projectstatus=$(this).closest("tr").attr("status");
    $("#id_allstatus").val(projectstatus);
});



//jieti score js 
$(document).on("click","[name='judge']",function(){
    judgeid=$(this).closest("tr").attr("iid");
    Dajaxice.school.getScore(getScoreCallBack, {"pid": judgeid});
    projectstatus=$(this).closest("tr").attr("status");
});

function getScoreCallBack(data){
    $("#score_tables_part").html(data.html);  
    $(".expert_score_list_item").hide();
    $("#detail_btn").attr("name", "detail_show_btn");
    $("#detail_btn").html("显示具体得分");
}
$(document).on("click", "[name='detail_show_btn']", function(){
    $(".expert_score_list_item").show();
    $("#detail_btn").attr("name", "detail_hide_btn");
    $("#detail_btn").html("隐藏具体得分");
});
$(document).on("click", "[name='detail_hide_btn']", function(){
    $(".expert_score_list_item").hide();
    $("#detail_btn").attr("name", "detail_show_btn");
    $("#detail_btn").html("显示具体得分");
});
//---jieti 

$("#status_submit").click(function(){
    var value=$("#id_allstatus").val();
    Dajaxice.common.StatusChange(getPaginationCallBack,{
        "judgeid":judgeid,
        "status":value,
        "page2":$("#pass_paginator .disabled").attr("value"),
        "searchForm":$("#schedule_form").serialize(true)
    });
});




//pingshen
$('#review_modal').on('show.bs.modal', function (e) {


    $("#budget").show(500);
    $("[name='not_pass_reason']").hide(500);
    $("#not_pass_article").hide(500);
  
    $("[name='reason']").val("");

    


    $("[name='judgeresult']").css("color","gray");
    var x = document.getElementById("id_judgeresult");
    for(var i = 0; i < x.options.length; ++ i)
    x.options[i].selected = false;


    x.options[0].selected = true;

  // do something...   
})

// $("#id_skip_judge_1").click(function(){
//     $(this).prop("checked",true);
//     $("#id_skip_judge_0").prop("checked",false);
// });

// $("#id_skip_judge_0").click(function(){
//     $(this).prop("checked",true);
//     $("#id_skip_judge_1").prop("checked",false);
// });

$(document).on("click","#id_judge",function(){
    //alert($("#schedule_form").serialize(true));
    var project_id =$(this).closest("tr").attr("iid");
    judgeid=$(this).closest("tr").attr("iid");
    projectstatus=$(this).closest("tr").attr("status");
    $("#id_allstatus").val(projectstatus);
   
    Dajaxice.adminStaff.getProjectStatus(getProjectStatusCallBack,{'project_id':project_id});
});

$("[name='commit']").click(function(){
    var value=$(this).closest(".modal").find("#id_judgeresult").val();
    var lookThroughForm=$(this).closest(".modal").find("#lookThroughForm").serialize(true);
    //var lookThroughForm = $("#review_modal").find("#lookThroughForm").serialize(true);
    var skip_judge;
    if($("#id_skip_judge_1").prop("checked")==true) {skip_judge=false;}
    if($("#id_skip_judge_0").prop("checked")==true){skip_judge=true;}
   
    userrole=$(".tab-content").attr("userrole");
    userstatus=$(".tab-content").attr("userstatus");
  
  
    if(value!=-1){
        // alert(judgeid);
        // alert(userrole);
        // alert(userstatus);
        // alert($("#not_pass_paginator .disabled").attr("value"));
        // alert($("#pass_paginator .disabled").attr("value"));
        // alert(search);
        // alert(lookThroughForm);
        // alert($("#schedule_form").serialize(true));
        // alert(skip_judge);
        Dajaxice.common.LookThroughResult(look_through_call_back,{
            "judgeid":judgeid,
            "userrole":userrole,
            "userstatus":userstatus,
            "page":$("#not_pass_paginator .disabled").attr("value"),
            "page2":$("#pass_paginator .disabled").attr("value"),
            "search":search,
            "look_through_form":lookThroughForm,
            "searchForm":$("#schedule_form").serialize(true),
            "skip_judge":skip_judge,
        });
    }

});

function look_through_call_back(data){
    if(userstatus=="application"){
        $("#applicationTable").html(data.table_html);
    } 
    else{
        $("#researchTable").html(data.table_html);
    }

}



function getProjectStatusCallBack(data){
   if(data.status == "0") {
        alert(data.message);
    }
    else{
        $("#review_modal #lookThroughForm").html(data.html);
        $("#review_modal").modal('show');
    }
            
}












//modify project code
$('td a[href="#project_code_add"]').click(function(){
  glo_project_id = $(this).attr('pid');
  var project_unique_code = $(this).parent().text().trim();
  $('#project_code_add').find('#project_code').val(project_unique_code);
})

$('#project_code_submit').click(function(){
  var project_unique_code = $('#project_code_add').find('#project_code').val().trim();
  Dajaxice.adminStaff.change_project_unique_code(change_projectuniquecode_callback,{'project_id':glo_project_id,"project_unique_code":project_unique_code});
})
function change_projectuniquecode_callback(data){
    if(data.res == "error"){
        alert("格式不合法或相同编号已存在");
    }
    else{
        var target = "#ProjectUniqueCode_" + glo_project_id;
        $(target).html(data.res);
    }
}
//--modify project code

//getPagination
function getPagination(page,page2){
    userrole=$(".tab-content").attr("userrole");
    userstatus=$(".tab-content").attr("userstatus");
    
    Dajaxice.common.getPagination(getPaginationCallBack,{
        "page":page,
        "page2":page2,
        "userrole":userrole,
        "userstatus":userstatus,
        "search":search,
        "form":$("#schedule_form").serialize(true)
    });  
}
function getPaginationCallBack(data){
        $("#not_pass").html(data.table_not_pass);
        $("#pass").html(data.table_pass);
}

   
$(document).on("click","#not_pass_paginator .item_page",function(){
    page=$(this).attr("arg");
    page2=$("#pass_paginator .disabled").attr("value");
    getPagination(page,page2); 
});

$(document).on("click","#pass_paginator .item_page",function(){
    page2=$(this).attr("arg");
    
    page=$("#not_pass_paginator .disabled").attr("value");
    if(!page)page=-1;
    getPagination(page,page2); 
});
$("#filter_button").click(function(){
    search=1;
    getPagination(1,1);
});

//---getPagination