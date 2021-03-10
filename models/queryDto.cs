using System;
using System.Collections.Generic;
using System.Text;

namespace models
{
    public class queryDto
    {
        public filterOp sortProp { get; set; }
        public string sortDir { get; set; }

        public filterOp searchProp { get; set; }

        public string searchVal { get; set; }
    }
    public enum filterOp
    {
        author,
        title,
        none
    }
}
  


