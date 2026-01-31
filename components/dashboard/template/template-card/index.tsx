"use client";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Template } from '@/lib/mock';
import { ExternalLink, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react'
interface TemplatCardProps{
    template: Template;
    onUseTemplate:(template: Template) => void;
    onPreview:(template: Template) => void;
}
const TemplatCard = ({template, onUseTemplate, onPreview}: TemplatCardProps) => {
    const router = useRouter();
    const getIconComponent = (iconName:string)=> {
        const iconMap:{[key:string]:string} ={
            CreditCard: "💳",
            FileText: "📝",
            Mail: "📧",
            Webhook: "🔗",
        }
        return iconMap[iconName] || "🔧";
    }

    const useTemplatehendaler = () => {
        router.push(`/dashboard/template/${template.id}`)
    }
  return (
    <Card className="bg-[#121826] border-[#1E293B] hover:border-green-500/30 transition-all duration-200 group">
      <CardHeader className='pb-4'>
        <div className='flex items-start justify-between'>
            <div className='text-3xl mb-2'>{getIconComponent(template.icon)}</div>
            <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/20 text-xs">{template.category}</Badge>
        </div>
        <CardTitle className='text-lg text-white group-hover:text-green-400 transition-colors'>{template.name}</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <p className='text-sm text-gray-400 line-clamp-4'>{template.description}</p>

    <div className='space-y-2'>
        <div className='text-xs font-medium text-gray-400 uppercase tracking-wide'>steps({template.steps.length})</div>
            {template?.steps?.slice(0, 3).map((step, index) => (
        <div
        key={index}
        className="flex items-center gap-2 text-sm text-gray-300"
        >
        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
        <span>{step}</span>
    </div>
))}
            {template?.steps?.length > 3 && (
                <div className='text-xs text-gray-500 pl-4'>
                    +{template.steps.length - 3} more steps
                </div>
            )}
        </div>
        <div className='flex space-x-2 pt-2'>
            <Button onClick={useTemplatehendaler} className='flex-1 bg-green-500 hover:bg-green-600 text-black font-medium'>
                <ExternalLink className='w-4 h-4 mr-2'/>Use Template
            </Button>
            <Button variant="outline" onClick={() => onPreview(template)} className='border-[#334155] text-gray-300 hover:bg-[#1E293B] hover:text-white'>
                <Eye className='w-4 h-4'/>
            </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default TemplatCard
