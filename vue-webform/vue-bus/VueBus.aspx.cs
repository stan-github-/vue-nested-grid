using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace vue_webform
{
    public partial class VueBus : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            LoadVueResources();
        }

        //note must be order in by dependencies!!!!
        private void LoadVueResources()
        {
            var list = new List<Tuple<string, string, string>>() { 

                new Tuple<string, string, string>("text/javascript", "parent-js", @".\vue-bus\parent\parent.js"),
                new Tuple<string, string, string>("text/x-template", "parent-template", @".\vue-bus\parent\parent.html"),

                new Tuple<string, string, string>("text/javascript", "child-js", @".\vue-bus\child\child.js"),
                new Tuple<string, string, string>("text/x-template", "child-template", @".\vue-bus\child\child.html"),

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