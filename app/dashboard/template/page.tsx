"use client";
import TemplatCard from '@/components/dashboard/template/template-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { mockTemplate, Template } from '@/lib/mock';
import { CheckCircle, Filter, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { templateLiteral } from 'zod';

const Templates = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const router = useRouter();

  const categories = ['all', ...Array.from(new Set(mockTemplate.map(t => t.category)))];

  const filteredTemplates = mockTemplate.filter((template)=>{
    const matchesSearch =
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });
  const handleUseTemplate = (template: Template) => {
    router.push(`/dashboard/template/${template.id}`);
  };
  const handlePreview = (template: Template) => {
    setPreviewTemplate(template)
  }
  return (
    <div className='p-6 space-y-6'>
      <div>
        <h1 className='text-3xl font-bold text-white mb-2'>Template Gallery</h1>
        <p className='text-gray-400'>Get started quickly with pre-built automation template</p>
      </div>
      <div className='flex items-center space-x-4 bg-[#121826] p-4 rounded-lg border border-[#1E293B]'>
        <div className='relative flex-1 max-w-md'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4'/>
          <Input placeholder='Search template...' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className='pl-10 bg-[#1E293B] border-[#334155] text-gray-200'/>
        </div>
          <div className='flex items-center space-x-2'>
            {categories.map((category)=>(
              <Button key={category} variant={selectedCategory === category ? "default" : "outline"} size="sm" onClick={()=> setSelectedCategory(category)} className={
                selectedCategory === category ? "bg-green-500 hover:bg-green-600 text-black" : "border-[#334155] text-gray-300 hover:bg-[#1E293B] hover:text-white"
              }>
                {category === "all" ? "All" : category}
              </Button>
            ))}
          </div>
          <div className='flex items-center space-x-2'>
            <Filter className='w-4 h-4 text-gray-400'/>
            <Badge variant="outline" className='border-[#334155] text-gray-400'>
              {filteredTemplates.length} template
              {filteredTemplates.length !== 1 ? "s" : ""}
            </Badge>
          </div>
      </div>
      {filteredTemplates.length > 0?(
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
          {filteredTemplates ?.map((template) =>(
            <TemplatCard key={template.id}
          template={template}
          onUseTemplate={handleUseTemplate}
          onPreview={handlePreview}/>
          ))}
        </div>
      ) : (
        <div className='text-center py-12'>
          <div className='w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4'>
            <Search className='w-8 h-8 text-gray-400'/>
          </div>
          <h3 className='text-lg font-medium text-white mb-2'>No template found</h3>
          <p className='text-gray-400'>Try adjusting your search terms or category filters</p>
        </div>
      )}

      <Dialog open={!!previewTemplate} onOpenChange={()=> setPreviewTemplate(null)}>
        <DialogContent className='bg-[#121826] border-[#1E293B] text-white max-w-2xl'>
          <DialogHeader>
            <DialogTitle className='text-xl flex items-center space-x-3'>
              <span className='text-3xl'>
                {previewTemplate && previewTemplate.icon == "CreditCard" && "💳"}
                {previewTemplate && previewTemplate.icon == "FileText" && "📝"}
                {previewTemplate && previewTemplate.icon == "Mail" && "📧"}
                {previewTemplate && previewTemplate.icon == "Webhook" && "🔗"}
              </span>
              <span>{previewTemplate?.name}</span>
            </DialogTitle>
            <DialogDescription className='text-gray-400'>
              {previewTemplate?.description}
            </DialogDescription>
          </DialogHeader>

          {
            previewTemplate && (
              <div className='space-y-6 mt-6'>
                <div>
                  <h4 className='text-sm font-medium text-gray-400 uppercase tracking-wide mb-3'>Workflow Steps</h4>
                  <div className='space-y-3'>
                    {previewTemplate.steps.map((step, index)=>(
                      <div key={index} className='flex items-center space-x-3 p-3 bg-[#1E293B] rounded-lg'>
                        <div className='w-8 h-8 bg-green-500/20 rounded-full flex justify-center items-center'>
                        <span className='text-sm font-medium text-green-400'>
                          {index + 1}
                        </span>
                        </div>
                        <div className='flex-1'>
                          <div className='text-white font-medium'>{step}</div>
                        </div>
                        <CheckCircle className='w-5 h-5 text-green-400'/>
                      </div>
                    ))}
                  </div>
                </div>

                <div className='flex space-x-3'>
                  <Button onClick={()=>{
                    handleUseTemplate(previewTemplate);
                    setPreviewTemplate(null)
                  }} className='flex-1 bg-green-500 hover:bg-green-600 text-black font-medium'>Use This Template</Button>
                  <Button variant="outline" onClick={()=> setPreviewTemplate(null)} className='border-[#334155] text-gray-300 hover:bg-[#1E293B] hover:text-white'>Close </Button>
                </div>
              </div>
            )
          }
        </DialogContent>
      </Dialog>
    </div>
  );
};  

export default Templates
