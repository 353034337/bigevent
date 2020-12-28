$(function () {
  // 点击“去注册账号”的链接
  $("#link_reg").on("click", function () {
    $(".reg-box").show();
    $(".login-box").hide();
  });

  // 点击“去登录”的链接
  $("#link_login").on("click", function () {
    $(".login-box").show();
    $(".reg-box").hide();
  });

  var form = layui.form;
  form.verify({
    pwd: [/^[\S]{6,12}$/, "密码必须是6到12位，不能有空格"],
    repwd: function (value) {
      const pwd = $(".reg-box [name=password]").val();

      if (pwd != value) {
        return "两次输入的密码不一致";
      }
    },
  });
  var layer = layui.layer;
  // 监听注册表单的提交事件
  $("#form_reg").on("submit", function (e) {
    // 1. 阻止默认的提交行为
    e.preventDefault();
    // 2. 发起Ajax的POST请求
    var data = {
      username: $("#form_reg [name=username]").val(),
      password: $("#form_reg [name=password]").val(),
    };
    $.post("/api/reguser", data, function (res) {
      if (res.status !== 0) {
        return layer.msg(res.message);
      }
      layer.msg("注册成功，请登录！");
      // 模拟人的点击行为
      $("#link_login").click();
    });
  });

  $("#form_login").on("submit", function (e) {
    e.preventDefault();

    $.ajax({
      url: "/api/login",
      method: "POST",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          layer.msg(res.message);
          return;
        }
        layer.msg("登陆成功");
        localStorage.setItem("token", res.token);
        location.href = "/index.html";
      },
    });
  });
});
