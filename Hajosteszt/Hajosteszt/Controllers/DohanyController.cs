using Hajosteszt.DohanyModels2;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Hajosteszt
{
    [Route("api/vizipipa")]
    [ApiController]
    public class DohanyController : ControllerBase
    {
        [HttpGet]
        [Route("count")]
        public int elso() 
        {
            SzamhaloContext context = new SzamhaloContext();
            int VpSzáma = context.Xsegpls.Count();

            return VpSzáma;
        }

        
        [HttpGet("all")]
        public IEnumerable<Xsegpl> Get()
        {
            SzamhaloContext context = new SzamhaloContext();
            return context.Xsegpls.ToList();
        }
        
        [HttpGet("{id}")]
        public Xsegpl Get(int id)
        {
            SzamhaloContext context = new SzamhaloContext();
            var keresett = (from x in context.Xsegpls
                                where x.VizipipadohanyId == id
                                select x).FirstOrDefault();
            return keresett;
        }

        
        [HttpPost]
        public void Post([FromBody] Xsegpl újÍz)
        {
            SzamhaloContext context = new SzamhaloContext();
            context.Xsegpls.Add(újÍz);
            context.SaveChanges();
        }
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            SzamhaloContext context = new SzamhaloContext();
            var törlendőÍz = (from x in context.Xsegpls
                                where x.VizipipadohanyId== id
                                select x).FirstOrDefault();
            context.Remove(törlendőÍz);
            context.SaveChanges();
        }
    }

}
