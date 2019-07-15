<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="VueBus.aspx.cs" Inherits="vue_webform.VueBus" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <%--vue--%>
    <script src="inc/vue.min.js"></script>
    <%-- bootstrap --%>
    <!-- Add this after vue.js -->
    <link type="text/css" rel="stylesheet" href="//unpkg.com/bootstrap/dist/css/bootstrap.min.css"/>
    <link type="text/css" rel="stylesheet" href="//unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.css"/>
    
    <script src="//unpkg.com/babel-polyfill@latest/dist/polyfill.min.js"></script>
    <script src="//unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.js"></script>

    <!--<link type="text/css" rel="Stylesheet" href="inc/bootstrap/css/bootstrap-theme.min.css" />
    <link type="text/css" rel="Stylesheet" href="inc/bootstrap/css/bootstrap.min.css" />-->

    <%-- jquery --%>
    <script type="text/javascript" src="inc/jquery-2.1.1.min.js"></script>
    
    <%--custon code --%>
    <script type="text/javascript" src="./sight-line/vue-query-builder/utilities.js"></script>
    
    <%-- custom componet css --%>
    <%-- %><link type="text/css" rel="Stylesheet" href="./sight-line/vue-query-builder/query-builder-group/query-builder-group.css"/>
    <link type="text/css" rel="Stylesheet" href="./sight-line/vue-query-builder/query-builder-single/query-builder-single.css"/>
    <link type="text/css" rel="Stylesheet" href="./sight-line/vue-query-builder/query-builder-then/query-builder-then.css"/>
    <link type="text/css" rel="Stylesheet" href="./iconmoon/style.css"/>--%>
    
    <%-- loader --%>
    <script type="text/javascript" src="vue-bus-init.js"></script>
    
    <script>
        //disable form post back!!
        $(document).ready(function() {
            $('.mainForm').attr('post', null);
            $('.mainForm').attr('action', null);
            $('.mainForm').submit(false);
        });
    </script>
</head>

<body>
    <form runat="server" class="mainForm">
        <asp:ScriptManager ID="scriptManager" runat="server">
        </asp:ScriptManager>
        <div id="vueApp">
            <input type="button" @click="onClick" value="click"></input>
            <input type="button" @click="onCreate" value="create"></input>
            <pre style="width:30%; float:left">{{window.vueBus.data}}</pre>
            <parent style="width:30%; float:left"></parent>
            <child style="width:30%; float:left"></child>
        </div>    
    </form>
</body>
</html>
