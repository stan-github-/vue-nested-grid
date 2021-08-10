<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Index.aspx.cs" Inherits="vue_webform.Index" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <%--vue--%>
    <script src="../inc/vue.min.js"></script>
    <%-- bootstrap --%>
    <link type="text/css" rel="Stylesheet" href="../inc/bootstrap4/bootstrap.css" />
    <link type="text/css" rel="Stylesheet" href="../inc/bootstrap4/bootstrap-grid.css" />
    <%-- jquery --%>
    <script type="text/javascript" src="../inc/jquery-2.1.1.min.js"></script>
    <%-- lodash --%>
    <script type="text/javascript" src="../inc/lodash.js"></script>
    <%--for sorting on multiple columns--%>
    <script type="text/javascript" src="../inc/thenby.js"></script>
    
    <%-- custom componet css --%>
    <link type="text/css" rel="Stylesheet" href="./grid/grid-vue.css"/>
    <link type="text/css" rel="Stylesheet" href="./grid-context-menu/grid-vue-context-menu.css"/>
    <link type="text/css" rel="stylesheet" href="../inc/icon-moon/style.css" />
    
    <%-- loader --%>
    <script type="text/javascript" src="vue-init.js"></script>
</head>

<body>
    <form runat="server">
        <asp:ScriptManager ID="scriptManager" runat="server">
        </asp:ScriptManager>
        <div id="vueApp" @click="onClick">
            <grid-vue-wrapper></grid-vue-wrapper>
        </div>    
    </form>
    <script>
        $(document).ready(function () {
            $('form').submit(false);
        });
    </script>
</body>
</html>
