$(document).ready(function () {

	//用户名验证
	var state1 = false;
	$("#username").textbox('textbox').blur(function () {
		if ($(this).val() == '') {
			$("#uinfo").text("用户名不能为空");			    
		} else {
			$.ajax({
				url: "./userExists.action",
				async: true,
				type: "POST",
				dataType: "text",
				data: {
					username: $('#username').val().trim()
				},
				success: function (flag) {
					if (flag == "true") {
						$("#uinfo").text("该用户名已存在，请重新填写");
					} else if (flag == "false") {
						$("#uinfo").text('');
						$("#uinfo").append("<img src='./img/3_ok.png' />");
						state1 = true;
					}
				}
			})
		}
	});

	//密码验证
	var state2 = false;
	$("#password").textbox('textbox').blur(function () {
		if ($(this).val() == '') {
			$("#pinfo").text("密码不能为空");
			    
		} else {
			if ($(this).val().length < 6) {
				$("#pinfo").text("密码必须大于等于6位，请重新填写");
				        
			} else if ($(this).val().length > 20) {
				$("#pinfo").text("密码必须小于等于20位，请重新填写");
				        
			} else {
	            $("#pinfo").text('');
	            $("#pinfo").append("<img src='./img/3_ok.png' />");
	            state2 = true;
			}
		}
	});
	//确认密码
	var state3 = false;
	$("#passwordagain").textbox('textbox').blur(function () {
		if ($(this).val() == '') {
			$("#painfo").text("密码不能为空");	    
		} else {
			if ($("#passwordagain").textbox('getValue') != $("#password").val()) {
				$("#painfo").text("两次输入的密码不一致，请重新填写");     
			} else {
	            $("#painfo").text('');
	            $("#painfo").append("<img src='./img/3_ok.png' />");
	            state3 = true;		        
			}
		}
	});
	//邮箱验证
	var state4 = false;
	$("#email").textbox('textbox').blur(function () {
		if ($(this).val() == '') {
			$("#einfo").text("邮箱不能为空");			    
		} else {
			if (/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test($(this).val()) == false) {
				$("#einfo").text("邮箱格式不正确，请重新填写");
				        
			} else {
				$.ajax({
					url: "./emailExists.action",
					async: true,
					type: "POST",
					dataType: "text",
					data: {
						email: $('#email').val().trim()
					},
					success: function (flag) {
						if (flag == "true") {
							$("#einfo").text("该邮箱已被占用，请重新填写");
						} else if (flag == "false") {
							$("#einfo").text('');
							$("#einfo").append("<img src='./img/3_ok.png' />");
							state4 = true;
						}
					}
				})
				       
			}
		}
	});
	
	
	
	//发邮件	
	$("#sendcode2email").click(function () {
		if(state4){
			$.ajax({
				url: "./sendcode2email.action",
				async: true,
				type: "POST",
				dataType: "text",
				data: {
					email: $('#email').val().trim()
				},
				//contentType:"application/json",
				success: function (data) {
					alert(data);
				},
				error: function () {
					alert("未知错误");
				}
			});
		}else{
			alert("邮箱信息错误！")
		}
	});

	//注册
	$("#registerbtn").click(function () {	    
		//alert($('#email_code').val());    	       
		//         	$('#registerform').submit();
		if (state1 && state2 && state3 && state4) {
			$.ajax({
				url: "./register.action",
				type: "POST",
				dataType: "text",
				data: {
					username: $('#username').val().trim(),
					password: hex_md5($('#password').val().trim()),
					email: $('#email').val().trim(),
					checkcode: $('#email_code').val().trim()
				},
				success: function (row) {
					if (row == 1) {
						//alert("注册成功");
						$.messager.show({
							title: '恭喜您',
							msg: '注册成功！',
							showType: 'show',
							timeout: 1000,
							style: {
								right: '',
								bottom: '',
							}
						});
						setTimeout(function () {
							window.location.href = "./main.action"
						}, 1000);
					} else {
						alert(row);
					}
				},
				error: function () {
					alert("未知错误！");
				}
			})
		} else {
			$.messager.alert('注册失败', '注册信息不正确！');
		}

	});

})