using System;
using System.Collections.Generic;
using System.Text;

namespace models
{
   public class post:ICloneable
    {
        public int id { get; set; }
        public string author { get; set; }
        public string title { get; set; }
        public bool favorite { get; set; }
        public List<comment> comments { get; set; }

        public object Clone()
        {
            return new post { id = id, author = author, title = title, favorite = favorite, comments = comments };
        }
    }
}
