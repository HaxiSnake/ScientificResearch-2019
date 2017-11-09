$(function(){
  $("#schedule_form .export-excel").click(function(){
     export_form = $(this).parents("form");
     $('#excelprogress').modal('show');
     Dajaxice.common.ExportExcel(ExportExcel_callback,{'form':$(export_form).serialize(true),'category':$(this).attr("eid")});
  })
  $("#teacher_form .export-excel").click(function(){
    $('#excelprogress').modal('show');
    Dajaxice.common.ExportTeacherInfoExcel(ExportExcel_callback,{'category':$(this).attr("eid")});
  })
  $("#achievement_form .export-excel").click(function(){
    $('#excelprogress').modal('show');
    export_form = $(this).parents("form");
    Dajaxice.common.ExportAchievementInfoExcel(ExportExcel_callback,{'form':$(export_form).serialize(true)});
  })
  refreshMutilipSelect();
})

function ExportExcel_callback(data){
  if (data.status == "ok") {
    location.href = data.path;
    $('#excelprogress').modal('hide');
  } else {
    alert("请选择正确的年份");
  }
  
}

function refreshMutilipSelect(){
  var build = function(select, tr) {
    select.multiselect();
    return false;
  }($('#id_status'));
}

