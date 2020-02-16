<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="1.0">
    
    <xsl:output method="text"/> 
    
    <xsl:template match="/">
        <xsl:apply-templates mode="e1"/>
    </xsl:template>
    
    <xsl:template match="obra" mode="e1">
        ###  http://prc.di.uminho.pt/2020/arquivosmusicas#<xsl:value-of select="@id" />
        :<xsl:value-of select="@id" /> rdf:type owl:NamedIndividual ,
        :Obra ;
        :compositor "<xsl:value-of select="compositor" />"^^xsd:string ;
        :tipo "<xsl:value-of select="tipo" />"^^xsd:string ;
        :titulo "<xsl:value-of select="titulo" />"^^xsd:string.
        <xsl:apply-templates select="instrumentos" mode="e2" />
    </xsl:template>
    
    <xsl:template match="instrumento" mode="e2">
        ###  http://prc.di.uminho.pt/2020/arquivosmusicas#<xsl:value-of select="partitura/@path" />
        :<xsl:value-of select="partitura/@path" /> rdf:type owl:NamedIndividual ,
        :Partitura ;
        :define :<xsl:value-of select="../../@id" />__<xsl:value-of select="translate(designacao,' ','')" /> ;
        :path "<xsl:value-of select="partitura/@path" />"^^xsd:string ;
        :type "<xsl:value-of select="partitura/@type" />"^^xsd:string ;
        :voz "<xsl:value-of select="partitura/@voz" />"^^xsd:string .
        
        ###  http://prc.di.uminho.pt/2020/arquivosmusicas#<xsl:value-of select="../../@id" />_<xsl:value-of select="translate(designacao,' ','')" />
        :<xsl:value-of select="../../@id" />__<xsl:value-of select="translate(designacao,' ','')" /> rdf:type owl:NamedIndividual ,
        :Instrumento ;
        :éContidoPor :<xsl:value-of select="../../@id" /> ;
        :designacao "<xsl:value-of select="translate(designacao,' ','')" />"^^xsd:string .
    </xsl:template>

</xsl:stylesheet>