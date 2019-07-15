using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace vue_webform
{
    public partial class Index : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            LoadVueResources();
        }

        private void LoadVueResources()
        {
            var list = new List<Tuple<string, string, string>>() {
                new Tuple<string, string, string>("text/javascript", "data-store-js", @".\datastore.js"),
                new Tuple<string, string, string>("text/javascript", "grid-vue-context-menu-js", @".\grid-context-menu\grid-vue-context-menu.js"),
                new Tuple<string, string, string>("text/x-template", "grid-vue-context-menu-template", @".\grid-context-menu\grid-vue-context-menu.html"),

                new Tuple<string, string, string>("text/javascript", "grid-vue-details-js", @".\grid\grid-vue-details.js"),
                new Tuple<string, string, string>("text/x-template", "grid-vue-details-template", @".\grid\grid-vue-details.html"),

                new Tuple<string, string, string>("text/javascript", "grid-vue-js", @".\grid\grid-vue.js"),
                new Tuple<string, string, string>("text/x-template", "grid-vue-template", @".\grid\grid-vue.html"),

                new Tuple<string, string, string>("text/javascript", "grid-vue-wrapper-js", @".\grid-wrapper\grid-vue-wrapper.js"),
                new Tuple<string, string, string>("text/x-template", "grid-vue-wrapper-template", @".\grid-wrapper\grid-vue-wrapper.html"),
                
            };

            //if javascript template, load in the actual html into page
            foreach (var l in list.Where(l => l.Item1 == "text/x-template"))
            {
                string path = Server.MapPath(l.Item3);
                var text = new StringBuilder();
                text.Append(string.Format(@"<script type=""text/x-template"" id=""{0}"">{1}</script>",
                    l.Item2, System.IO.File.ReadAllText(path)));
                ClientScript.RegisterClientScriptBlock(GetType(), l.Item2, text.ToString());
            }

            //if javascript just use src, could be static but just to keep everything together.
            foreach (var l in list.Where(l => l.Item1 == "text/javascript"))
            {
                var text = new StringBuilder();
                text.Append(string.Format(@"<script type=""text/javascript"" src=""{0}""></script>", l.Item3));
                ClientScript.RegisterClientScriptBlock(GetType(), l.Item2, text.ToString());
            }
        }
    }
}