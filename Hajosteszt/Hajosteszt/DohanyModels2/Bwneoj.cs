﻿using System;
using System.Collections.Generic;

#nullable disable

namespace Hajosteszt.DohanyModels2
{
    public partial class Bwneoj
    {
        public byte Id { get; set; }
        public string Márka { get; set; }
        public string Modell { get; set; }
        public byte? Méret { get; set; }
        public int? Ár { get; set; }
    }
}
