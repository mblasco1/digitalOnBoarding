﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace AddressChecker
{
    
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Tools.ServiceModel.Svcutil", "2.0.1-preview-30422-0661")]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.Xml.Serialization.XmlTypeAttribute(Namespace="http://post.ch/ACHTypes/V4-02-00")]
    public partial class JavaExceptionType
    {
        
        private string typeField;
        
        private string messageField;
        
        private string traceField;
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Order=0)]
        public string Type
        {
            get
            {
                return this.typeField;
            }
            set
            {
                this.typeField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Order=1)]
        public string Message
        {
            get
            {
                return this.messageField;
            }
            set
            {
                this.messageField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Order=2)]
        public string Trace
        {
            get
            {
                return this.traceField;
            }
            set
            {
                this.traceField = value;
            }
        }
    }
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Tools.ServiceModel.Svcutil", "2.0.1-preview-30422-0661")]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.Xml.Serialization.XmlTypeAttribute(Namespace="http://post.ch/AdressCheckerExtern/V4-02-00")]
    public partial class AdressCheckerResponseType
    {
        
        private string countField;
        
        private bool hasMoreRowsField;
        
        private AdressCheckerResponseTypeRows[] rowsField;
        
        private AdressCheckerResponseTypeFault faultField;
        
        public AdressCheckerResponseType()
        {
            this.countField = "0";
            this.hasMoreRowsField = false;
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Form=System.Xml.Schema.XmlSchemaForm.Unqualified, DataType="integer", Order=0)]
        [System.ComponentModel.DefaultValueAttribute("0")]
        public string Count
        {
            get
            {
                return this.countField;
            }
            set
            {
                this.countField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Form=System.Xml.Schema.XmlSchemaForm.Unqualified, Order=1)]
        [System.ComponentModel.DefaultValueAttribute(false)]
        public bool HasMoreRows
        {
            get
            {
                return this.hasMoreRowsField;
            }
            set
            {
                this.hasMoreRowsField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute("Rows", Form=System.Xml.Schema.XmlSchemaForm.Unqualified, Order=2)]
        public AdressCheckerResponseTypeRows[] Rows
        {
            get
            {
                return this.rowsField;
            }
            set
            {
                this.rowsField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Form=System.Xml.Schema.XmlSchemaForm.Unqualified, Order=3)]
        public AdressCheckerResponseTypeFault Fault
        {
            get
            {
                return this.faultField;
            }
            set
            {
                this.faultField = value;
            }
        }
    }
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Tools.ServiceModel.Svcutil", "2.0.1-preview-30422-0661")]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://post.ch/AdressCheckerExtern/V4-02-00")]
    public partial class AdressCheckerResponseTypeRows
    {
        
        private string matchUniquenessField;
        
        private string matchTypeField;
        
        private string matchHistoricField;
        
        private string guaranteedDeliveryField;
        
        private string ampKeyField;
        
        private string personKeyField;
        
        private string hasPboxField;
        
        private string pboxZipField;
        
        private string pboxTownField;
        
        private string houseKeyField;
        
        private string streetField;
        
        private string streetFormattedField;
        
        private string houseNbrField;
        
        private string deliveryPointField;
        
        private string adressOfficialField;
        
        private string streetValidField;
        
        private string houseNbrValidField;
        
        private string deliveryPointHouseKeyField;
        
        private string alternativeStreetField;
        
        private string onrpField;
        
        private string zipField;
        
        private string town18Field;
        
        private string town27Field;
        
        private string zipTypeField;
        
        private string zipLangField;
        
        private string additionalOnrpField;
        
        private string additionalZipField;
        
        private string additionalTown18Field;
        
        private string additionalTown27Field;
        
        private string additionalZipTypeField;
        
        private string additionalZipLangField;
        
        private string zipValidField;
        
        private string townValidField;
        
        private string townOfficialField;
        
        private string streetOfficialField;
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Form=System.Xml.Schema.XmlSchemaForm.Unqualified, DataType="integer", Order=0)]
        public string MatchUniqueness
        {
            get
            {
                return this.matchUniquenessField;
            }
            set
            {
                this.matchUniquenessField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Form=System.Xml.Schema.XmlSchemaForm.Unqualified, DataType="integer", Order=1)]
        public string MatchType
        {
            get
            {
                return this.matchTypeField;
            }
            set
            {
                this.matchTypeField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Form=System.Xml.Schema.XmlSchemaForm.Unqualified, DataType="integer", Order=2)]
        public string MatchHistoric
        {
            get
            {
                return this.matchHistoricField;
            }
            set
            {
                this.matchHistoricField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Form=System.Xml.Schema.XmlSchemaForm.Unqualified, DataType="integer", Order=3)]
        public string GuaranteedDelivery
        {
            get
            {
                return this.guaranteedDeliveryField;
            }
            set
            {
                this.guaranteedDeliveryField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Form=System.Xml.Schema.XmlSchemaForm.Unqualified, DataType="integer", Order=4)]
        public string AmpKey
        {
            get
            {
                return this.ampKeyField;
            }
            set
            {
                this.ampKeyField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Form=System.Xml.Schema.XmlSchemaForm.Unqualified, DataType="integer", Order=5)]
        public string PersonKey
        {
            get
            {
                return this.personKeyField;
            }
            set
            {
                this.personKeyField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Form=System.Xml.Schema.XmlSchemaForm.Unqualified, DataType="integer", Order=6)]
        public string HasPbox
        {
            get
            {
                return this.hasPboxField;
            }
            set
            {
                this.hasPboxField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Form=System.Xml.Schema.XmlSchemaForm.Unqualified, Order=7)]
        public string PboxZip
        {
            get
            {
                return this.pboxZipField;
            }
            set
            {
                this.pboxZipField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Form=System.Xml.Schema.XmlSchemaForm.Unqualified, Order=8)]
        public string PboxTown
        {
            get
            {
                return this.pboxTownField;
            }
            set
            {
                this.pboxTownField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Form=System.Xml.Schema.XmlSchemaForm.Unqualified, DataType="integer", Order=9)]
        public string HouseKey
        {
            get
            {
                return this.houseKeyField;
            }
            set
            {
                this.houseKeyField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Form=System.Xml.Schema.XmlSchemaForm.Unqualified, Order=10)]
        public string Street
        {
            get
            {
                return this.streetField;
            }
            set
            {
                this.streetField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Form=System.Xml.Schema.XmlSchemaForm.Unqualified, Order=11)]
        public string StreetFormatted
        {
            get
            {
                return this.streetFormattedField;
            }
            set
            {
                this.streetFormattedField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Form=System.Xml.Schema.XmlSchemaForm.Unqualified, Order=12)]
        public string HouseNbr
        {
            get
            {
                return this.houseNbrField;
            }
            set
            {
                this.houseNbrField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Form=System.Xml.Schema.XmlSchemaForm.Unqualified, DataType="integer", Order=13)]
        public string DeliveryPoint
        {
            get
            {
                return this.deliveryPointField;
            }
            set
            {
                this.deliveryPointField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Form=System.Xml.Schema.XmlSchemaForm.Unqualified, DataType="integer", Order=14)]
        public string AdressOfficial
        {
            get
            {
                return this.adressOfficialField;
            }
            set
            {
                this.adressOfficialField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Form=System.Xml.Schema.XmlSchemaForm.Unqualified, DataType="integer", Order=15)]
        public string StreetValid
        {
            get
            {
                return this.streetValidField;
            }
            set
            {
                this.streetValidField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Form=System.Xml.Schema.XmlSchemaForm.Unqualified, DataType="integer", Order=16)]
        public string HouseNbrValid
        {
            get
            {
                return this.houseNbrValidField;
            }
            set
            {
                this.houseNbrValidField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Form=System.Xml.Schema.XmlSchemaForm.Unqualified, DataType="integer", Order=17)]
        public string DeliveryPointHouseKey
        {
            get
            {
                return this.deliveryPointHouseKeyField;
            }
            set
            {
                this.deliveryPointHouseKeyField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Form=System.Xml.Schema.XmlSchemaForm.Unqualified, Order=18)]
        public string AlternativeStreet
        {
            get
            {
                return this.alternativeStreetField;
            }
            set
            {
                this.alternativeStreetField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Form=System.Xml.Schema.XmlSchemaForm.Unqualified, DataType="integer", Order=19)]
        public string Onrp
        {
            get
            {
                return this.onrpField;
            }
            set
            {
                this.onrpField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Form=System.Xml.Schema.XmlSchemaForm.Unqualified, Order=20)]
        public string Zip
        {
            get
            {
                return this.zipField;
            }
            set
            {
                this.zipField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Form=System.Xml.Schema.XmlSchemaForm.Unqualified, Order=21)]
        public string Town18
        {
            get
            {
                return this.town18Field;
            }
            set
            {
                this.town18Field = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Form=System.Xml.Schema.XmlSchemaForm.Unqualified, Order=22)]
        public string Town27
        {
            get
            {
                return this.town27Field;
            }
            set
            {
                this.town27Field = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Form=System.Xml.Schema.XmlSchemaForm.Unqualified, DataType="integer", Order=23)]
        public string ZipType
        {
            get
            {
                return this.zipTypeField;
            }
            set
            {
                this.zipTypeField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Form=System.Xml.Schema.XmlSchemaForm.Unqualified, DataType="integer", Order=24)]
        public string ZipLang
        {
            get
            {
                return this.zipLangField;
            }
            set
            {
                this.zipLangField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Form=System.Xml.Schema.XmlSchemaForm.Unqualified, DataType="integer", Order=25)]
        public string AdditionalOnrp
        {
            get
            {
                return this.additionalOnrpField;
            }
            set
            {
                this.additionalOnrpField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Form=System.Xml.Schema.XmlSchemaForm.Unqualified, Order=26)]
        public string AdditionalZip
        {
            get
            {
                return this.additionalZipField;
            }
            set
            {
                this.additionalZipField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Form=System.Xml.Schema.XmlSchemaForm.Unqualified, Order=27)]
        public string AdditionalTown18
        {
            get
            {
                return this.additionalTown18Field;
            }
            set
            {
                this.additionalTown18Field = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Form=System.Xml.Schema.XmlSchemaForm.Unqualified, Order=28)]
        public string AdditionalTown27
        {
            get
            {
                return this.additionalTown27Field;
            }
            set
            {
                this.additionalTown27Field = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Form=System.Xml.Schema.XmlSchemaForm.Unqualified, DataType="integer", Order=29)]
        public string AdditionalZipType
        {
            get
            {
                return this.additionalZipTypeField;
            }
            set
            {
                this.additionalZipTypeField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Form=System.Xml.Schema.XmlSchemaForm.Unqualified, DataType="integer", Order=30)]
        public string AdditionalZipLang
        {
            get
            {
                return this.additionalZipLangField;
            }
            set
            {
                this.additionalZipLangField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Form=System.Xml.Schema.XmlSchemaForm.Unqualified, DataType="integer", Order=31)]
        public string ZipValid
        {
            get
            {
                return this.zipValidField;
            }
            set
            {
                this.zipValidField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Form=System.Xml.Schema.XmlSchemaForm.Unqualified, DataType="integer", Order=32)]
        public string TownValid
        {
            get
            {
                return this.townValidField;
            }
            set
            {
                this.townValidField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Form=System.Xml.Schema.XmlSchemaForm.Unqualified, DataType="integer", Order=33)]
        public string TownOfficial
        {
            get
            {
                return this.townOfficialField;
            }
            set
            {
                this.townOfficialField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Form=System.Xml.Schema.XmlSchemaForm.Unqualified, DataType="integer", Order=34)]
        public string StreetOfficial
        {
            get
            {
                return this.streetOfficialField;
            }
            set
            {
                this.streetOfficialField = value;
            }
        }
    }
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Tools.ServiceModel.Svcutil", "2.0.1-preview-30422-0661")]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://post.ch/AdressCheckerExtern/V4-02-00")]
    public partial class AdressCheckerResponseTypeFault
    {
        
        private string faultNrField;
        
        private string faultMsgField;
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Form=System.Xml.Schema.XmlSchemaForm.Unqualified, DataType="integer", Order=0)]
        public string FaultNr
        {
            get
            {
                return this.faultNrField;
            }
            set
            {
                this.faultNrField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Form=System.Xml.Schema.XmlSchemaForm.Unqualified, Order=1)]
        public string FaultMsg
        {
            get
            {
                return this.faultMsgField;
            }
            set
            {
                this.faultMsgField = value;
            }
        }
    }
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Tools.ServiceModel.Svcutil", "2.0.1-preview-30422-0661")]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.Xml.Serialization.XmlTypeAttribute(Namespace="http://post.ch/AdressCheckerExtern/V4-02-00")]
    public partial class AdressCheckerRequestType
    {
        
        private AdressCheckerRequestTypeParams paramsField;
        
        private string namesField;
        
        private string streetField;
        
        private string houseNbrField;
        
        private string onrpField;
        
        private string zipField;
        
        private string townField;
        
        private string houseKeyField;
        
        private string pboxAddressField;
        
        private string pboxNbrField;
        
        public AdressCheckerRequestType()
        {
            this.onrpField = "0";
            this.houseKeyField = "0";
            this.pboxAddressField = "0";
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Form=System.Xml.Schema.XmlSchemaForm.Unqualified, Order=0)]
        public AdressCheckerRequestTypeParams Params
        {
            get
            {
                return this.paramsField;
            }
            set
            {
                this.paramsField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Form=System.Xml.Schema.XmlSchemaForm.Unqualified, Order=1)]
        public string Names
        {
            get
            {
                return this.namesField;
            }
            set
            {
                this.namesField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Form=System.Xml.Schema.XmlSchemaForm.Unqualified, Order=2)]
        public string Street
        {
            get
            {
                return this.streetField;
            }
            set
            {
                this.streetField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Form=System.Xml.Schema.XmlSchemaForm.Unqualified, Order=3)]
        public string HouseNbr
        {
            get
            {
                return this.houseNbrField;
            }
            set
            {
                this.houseNbrField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Form=System.Xml.Schema.XmlSchemaForm.Unqualified, DataType="integer", Order=4)]
        [System.ComponentModel.DefaultValueAttribute("0")]
        public string Onrp
        {
            get
            {
                return this.onrpField;
            }
            set
            {
                this.onrpField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Form=System.Xml.Schema.XmlSchemaForm.Unqualified, Order=5)]
        public string Zip
        {
            get
            {
                return this.zipField;
            }
            set
            {
                this.zipField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Form=System.Xml.Schema.XmlSchemaForm.Unqualified, Order=6)]
        public string Town
        {
            get
            {
                return this.townField;
            }
            set
            {
                this.townField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Form=System.Xml.Schema.XmlSchemaForm.Unqualified, DataType="integer", Order=7)]
        public string HouseKey
        {
            get
            {
                return this.houseKeyField;
            }
            set
            {
                this.houseKeyField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Form=System.Xml.Schema.XmlSchemaForm.Unqualified, DataType="integer", Order=8)]
        [System.ComponentModel.DefaultValueAttribute("0")]
        public string PboxAddress
        {
            get
            {
                return this.pboxAddressField;
            }
            set
            {
                this.pboxAddressField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Form=System.Xml.Schema.XmlSchemaForm.Unqualified, Order=9)]
        public string PboxNbr
        {
            get
            {
                return this.pboxNbrField;
            }
            set
            {
                this.pboxNbrField = value;
            }
        }
    }
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Tools.ServiceModel.Svcutil", "2.0.1-preview-30422-0661")]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType=true, Namespace="http://post.ch/AdressCheckerExtern/V4-02-00")]
    public partial class AdressCheckerRequestTypeParams
    {
        
        private string maxRowsField;
        
        private string callUserField;
        
        private string searchLanguageField;
        
        private string searchTypeField;
        
        public AdressCheckerRequestTypeParams()
        {
            this.maxRowsField = "10";
            this.searchLanguageField = "1";
            this.searchTypeField = "10";
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Form=System.Xml.Schema.XmlSchemaForm.Unqualified, DataType="integer", Order=0)]
        public string MaxRows
        {
            get
            {
                return this.maxRowsField;
            }
            set
            {
                this.maxRowsField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Form=System.Xml.Schema.XmlSchemaForm.Unqualified, Order=1)]
        public string CallUser
        {
            get
            {
                return this.callUserField;
            }
            set
            {
                this.callUserField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Form=System.Xml.Schema.XmlSchemaForm.Unqualified, DataType="integer", Order=2)]
        public string SearchLanguage
        {
            get
            {
                return this.searchLanguageField;
            }
            set
            {
                this.searchLanguageField = value;
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Form=System.Xml.Schema.XmlSchemaForm.Unqualified, DataType="integer", Order=3)]
        public string SearchType
        {
            get
            {
                return this.searchTypeField;
            }
            set
            {
                this.searchTypeField = value;
            }
        }
    }
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Tools.ServiceModel.Svcutil", "2.0.1-preview-30422-0661")]
    [System.ServiceModel.ServiceContractAttribute(Namespace="http://post.ch/AdressCheckerExtern/V4-02-00", ConfigurationName="AddressChecker.ACHePortType")]
    public interface ACHePortType
    {
        
        [System.ServiceModel.OperationContractAttribute(Action="http://post.ch/AdressCheckerExtern/V4-02-00", ReplyAction="*")]
        [System.ServiceModel.FaultContractAttribute(typeof(AddressChecker.JavaExceptionType), Action="http://post.ch/AdressCheckerExtern/V4-02-00", Name="JavaException", Namespace="http://post.ch/ACHTypes/V4-02-00")]
        [System.ServiceModel.XmlSerializerFormatAttribute(SupportFaults=true)]
        System.Threading.Tasks.Task<AddressChecker.Output> AdrCheckerExterneAsync(AddressChecker.Input request);
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Tools.ServiceModel.Svcutil", "2.0.1-preview-30422-0661")]
    [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
    [System.ServiceModel.MessageContractAttribute(IsWrapped=false)]
    public partial class Input
    {
        
        [System.ServiceModel.MessageBodyMemberAttribute(Namespace="http://post.ch/AdressCheckerExtern/V4-02-00", Order=0)]
        public AddressChecker.AdressCheckerRequestType AdressCheckerRequest;
        
        public Input()
        {
        }
        
        public Input(AddressChecker.AdressCheckerRequestType AdressCheckerRequest)
        {
            this.AdressCheckerRequest = AdressCheckerRequest;
        }
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Tools.ServiceModel.Svcutil", "2.0.1-preview-30422-0661")]
    [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
    [System.ServiceModel.MessageContractAttribute(IsWrapped=false)]
    public partial class Output
    {
        
        [System.ServiceModel.MessageBodyMemberAttribute(Namespace="http://post.ch/AdressCheckerExtern/V4-02-00", Order=0)]
        public AddressChecker.AdressCheckerResponseType AdressCheckerResponse;
        
        public Output()
        {
        }
        
        public Output(AddressChecker.AdressCheckerResponseType AdressCheckerResponse)
        {
            this.AdressCheckerResponse = AdressCheckerResponse;
        }
    }
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Tools.ServiceModel.Svcutil", "2.0.1-preview-30422-0661")]
    public interface ACHePortTypeChannel : AddressChecker.ACHePortType, System.ServiceModel.IClientChannel
    {
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Tools.ServiceModel.Svcutil", "2.0.1-preview-30422-0661")]
    public partial class ACHePortTypeClient : System.ServiceModel.ClientBase<AddressChecker.ACHePortType>, AddressChecker.ACHePortType
    {
        
        /// <summary>
        /// Implement this partial method to configure the service endpoint.
        /// </summary>
        /// <param name="serviceEndpoint">The endpoint to configure</param>
        /// <param name="clientCredentials">The client credentials</param>
        static partial void ConfigureEndpoint(System.ServiceModel.Description.ServiceEndpoint serviceEndpoint, System.ServiceModel.Description.ClientCredentials clientCredentials);
        
        public ACHePortTypeClient() : 
                base(ACHePortTypeClient.GetDefaultBinding(), ACHePortTypeClient.GetDefaultEndpointAddress())
        {
            this.Endpoint.Name = EndpointConfiguration.ACHePortType.ToString();
            ConfigureEndpoint(this.Endpoint, this.ClientCredentials);
        }
        
        public ACHePortTypeClient(EndpointConfiguration endpointConfiguration) : 
                base(ACHePortTypeClient.GetBindingForEndpoint(endpointConfiguration), ACHePortTypeClient.GetEndpointAddress(endpointConfiguration))
        {
            this.Endpoint.Name = endpointConfiguration.ToString();
            ConfigureEndpoint(this.Endpoint, this.ClientCredentials);
        }
        
        public ACHePortTypeClient(EndpointConfiguration endpointConfiguration, string remoteAddress) : 
                base(ACHePortTypeClient.GetBindingForEndpoint(endpointConfiguration), new System.ServiceModel.EndpointAddress(remoteAddress))
        {
            this.Endpoint.Name = endpointConfiguration.ToString();
            ConfigureEndpoint(this.Endpoint, this.ClientCredentials);
        }
        
        public ACHePortTypeClient(EndpointConfiguration endpointConfiguration, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(ACHePortTypeClient.GetBindingForEndpoint(endpointConfiguration), remoteAddress)
        {
            this.Endpoint.Name = endpointConfiguration.ToString();
            ConfigureEndpoint(this.Endpoint, this.ClientCredentials);
        }
        
        public ACHePortTypeClient(System.ServiceModel.Channels.Binding binding, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(binding, remoteAddress)
        {
        }
        
        [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
        System.Threading.Tasks.Task<AddressChecker.Output> AddressChecker.ACHePortType.AdrCheckerExterneAsync(AddressChecker.Input request)
        {
            return base.Channel.AdrCheckerExterneAsync(request);
        }
        
        public System.Threading.Tasks.Task<AddressChecker.Output> AdrCheckerExterneAsync(AddressChecker.AdressCheckerRequestType AdressCheckerRequest)
        {
            AddressChecker.Input inValue = new AddressChecker.Input();
            inValue.AdressCheckerRequest = AdressCheckerRequest;
            return ((AddressChecker.ACHePortType)(this)).AdrCheckerExterneAsync(inValue);
        }
        
        public virtual System.Threading.Tasks.Task OpenAsync()
        {
            return System.Threading.Tasks.Task.Factory.FromAsync(((System.ServiceModel.ICommunicationObject)(this)).BeginOpen(null, null), new System.Action<System.IAsyncResult>(((System.ServiceModel.ICommunicationObject)(this)).EndOpen));
        }
        
        public virtual System.Threading.Tasks.Task CloseAsync()
        {
            return System.Threading.Tasks.Task.Factory.FromAsync(((System.ServiceModel.ICommunicationObject)(this)).BeginClose(null, null), new System.Action<System.IAsyncResult>(((System.ServiceModel.ICommunicationObject)(this)).EndClose));
        }
        
        private static System.ServiceModel.Channels.Binding GetBindingForEndpoint(EndpointConfiguration endpointConfiguration)
        {
            if ((endpointConfiguration == EndpointConfiguration.ACHePortType))
            {
                System.ServiceModel.BasicHttpBinding result = new System.ServiceModel.BasicHttpBinding();
                result.MaxBufferSize = int.MaxValue;
                result.ReaderQuotas = System.Xml.XmlDictionaryReaderQuotas.Max;
                result.MaxReceivedMessageSize = int.MaxValue;
                result.AllowCookies = true;
                result.Security.Mode = System.ServiceModel.BasicHttpSecurityMode.Transport;
                return result;
            }
            throw new System.InvalidOperationException(string.Format("Could not find endpoint with name \'{0}\'.", endpointConfiguration));
        }
        
        private static System.ServiceModel.EndpointAddress GetEndpointAddress(EndpointConfiguration endpointConfiguration)
        {
            if ((endpointConfiguration == EndpointConfiguration.ACHePortType))
            {
                return new System.ServiceModel.EndpointAddress("https://webservices.post.ch/IN_ADRCHECKERxV4xEXTERNE/V4-02-00");
            }
            throw new System.InvalidOperationException(string.Format("Could not find endpoint with name \'{0}\'.", endpointConfiguration));
        }
        
        private static System.ServiceModel.Channels.Binding GetDefaultBinding()
        {
            return ACHePortTypeClient.GetBindingForEndpoint(EndpointConfiguration.ACHePortType);
        }
        
        private static System.ServiceModel.EndpointAddress GetDefaultEndpointAddress()
        {
            return ACHePortTypeClient.GetEndpointAddress(EndpointConfiguration.ACHePortType);
        }
        
        public enum EndpointConfiguration
        {
            
            ACHePortType,
        }
    }
}
