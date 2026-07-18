import React from 'react';

export const Home: React.FC = () => {
  const cards = [
    {
      id: 1,
      title: '切割艺术',
      description: '用鼠标右键切割这个卡片，感受重力的力量',
      icon: 'scissors',
      colors: { from: '#8B5CF6', to: '#EC4899' },
    },
    {
      id: 2,
      title: '物理模拟',
      description: '被切割的元素会受到重力影响下落',
      icon: 'gravity',
      colors: { from: '#06B6D4', to: '#10B981' },
    },
    {
      id: 3,
      title: '银色拖尾',
      description: '切割时会留下美丽的银色发光轨迹',
      icon: 'sparkles',
      colors: { from: '#F59E0B', to: '#EF4444' },
    },
    {
      id: 4,
      title: '自由创作',
      description: '尝试切割各种元素，创造独特效果',
      icon: 'palette',
      colors: { from: '#6366F1', to: '#8B5CF6' },
    },
  ];

  const iconPaths: Record<string, string> = {
    scissors: 'M14.127 14.127a4 4 0 01-5.656 0M18 10h-1.268A8.959 8.959 0 0013 6.603V4a1 1 0 00-1-1H8a1 1 0 00-1 1v2.603a8.959 8.959 0 00-3.732 3.397H2a1 1 0 000 2h1.268a8.959 8.959 0 003.732 3.397V18a1 1 0 001 1h5a1 1 0 001-1v-2.603a8.959 8.959 0 003.732-3.397H18a1 1 0 000-2z',
    gravity: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z',
    sparkles: 'M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.264 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5',
    palette: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01',
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] overflow-x-hidden">
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-950/50 via-purple-950/30 to-slate-950/50 pointer-events-none" />
      
      <div 
        className="fixed inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(192, 192, 192, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(192, 192, 192, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
      
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: '1s' }} />

      <header className="relative z-10 pt-20 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm text-gray-400">左键切割 · 重力下落</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-silver-200 via-white to-silver-300 bg-clip-text text-transparent">
              网页切割器
            </span>
          </h1>
          
          <div className="relative inline-block">
            <p className="text-xl md:text-2xl text-gray-300 mb-2">
              左键点击并拖拽，切开任何元素
            </p>
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-silver-400 to-transparent opacity-50" />
          </div>
          
          <p className="text-gray-500 mt-6">
            被切割的元素会受重力影响，落在页面底部
          </p>
        </div>
      </header>

      <main className="relative z-10 px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <section className="mb-20">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-white flex items-center gap-4">
                <span className="relative">
                  <span className="absolute inset-0 bg-silver-400/20 blur-lg rounded-full" />
                  <span className="relative w-4 h-4 bg-gradient-to-br from-silver-300 to-silver-500 rounded-full" />
                </span>
                可切割卡片
              </h2>
              <span className="text-sm text-gray-500">悬停查看效果</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {cards.map((card) => (
                <div
                  key={card.id}
                  data-cuttable="true"
                  className="group relative bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 cursor-crosshair transition-all duration-500 hover:border-silver-400/50 hover:shadow-[0_0_40px_rgba(192,192,192,0.15)] hover:-translate-y-2"
                >
                  <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" 
                       style={{ backgroundImage: `linear-gradient(135deg, ${card.colors.from}22, ${card.colors.to}22)` }} />
                  
                  <div className="absolute inset-0 rounded-2xl overflow-hidden">
                    <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                         style={{ backgroundImage: `linear-gradient(135deg, ${card.colors.from}, transparent)` }} />
                  </div>
                  
                  <div className="relative">
                    <div 
                      className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-500 group-hover:scale-110"
                      style={{ background: `linear-gradient(135deg, ${card.colors.from}33, ${card.colors.to}33)` }}
                    >
                      <svg 
                        className="w-7 h-7 text-white" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        style={{ filter: `drop-shadow(0 0 8px ${card.colors.from})` }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={iconPaths[card.icon]} />
                      </svg>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-silver-200 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                  
                  <div className="absolute bottom-4 right-4">
                    <svg className="w-5 h-5 text-gray-600 group-hover:text-silver-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-20">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-white flex items-center gap-4">
                <span className="relative">
                  <span className="absolute inset-0 bg-silver-400/20 blur-lg rounded-full" />
                  <span className="relative w-4 h-4 bg-gradient-to-br from-silver-300 to-silver-500 rounded-full" />
                </span>
                图片画廊
              </h2>
              <span className="text-sm text-gray-500">尝试切割图片</span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((id) => (
                <div
                  key={id}
                  data-cuttable="true"
                  className="group relative aspect-square rounded-2xl overflow-hidden cursor-crosshair transition-all duration-500 hover:shadow-[0_0_50px_rgba(192,192,192,0.2)]"
                >
                  <img
                    src={`https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=abstract%20geometric%20art%20with%20neon%20lights%20and%20crystal%20textures&image_size=square`}
                    alt={`Artistic pattern ${id}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  
                  <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/30 rounded-2xl transition-all duration-500" />
                  
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                    <div className="flex items-center gap-2 text-white">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span className="text-sm font-medium">点击切割</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-20">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-white flex items-center gap-4">
                <span className="relative">
                  <span className="absolute inset-0 bg-silver-400/20 blur-lg rounded-full" />
                  <span className="relative w-4 h-4 bg-gradient-to-br from-silver-300 to-silver-500 rounded-full" />
                </span>
                文字元素
              </h2>
              <span className="text-sm text-gray-500">切割文字试试</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { text: '想象力', size: 'text-5xl', weight: 'font-black' },
                { text: '创造力', size: 'text-6xl', weight: 'font-black' },
                { text: '无限可能', size: 'text-4xl', weight: 'font-bold' },
              ].map((item, index) => (
                <div
                  key={index}
                  data-cuttable="true"
                  className="group relative flex items-center justify-center h-40 rounded-2xl bg-gray-800/30 backdrop-blur-sm border border-gray-700/30 cursor-crosshair transition-all duration-500 hover:border-silver-400/30 hover:shadow-[0_0_30px_rgba(192,192,192,0.1)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-silver-500/5 via-white/5 to-silver-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <span className={`${item.size} ${item.weight} bg-gradient-to-r from-silver-300 via-white to-silver-400 bg-clip-text text-transparent transition-all duration-500 group-hover:from-silver-200 group-hover:to-silver-300`}
                        style={{ textShadow: '0 0 30px rgba(192, 192, 192, 0.5)' }}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-20">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-white flex items-center gap-4">
                <span className="relative">
                  <span className="absolute inset-0 bg-silver-400/20 blur-lg rounded-full" />
                  <span className="relative w-4 h-4 bg-gradient-to-br from-silver-300 to-silver-500 rounded-full" />
                </span>
                功能按钮
              </h2>
              <span className="text-sm text-gray-500">切割按钮</span>
            </div>
            
            <div className="flex flex-wrap gap-4 justify-center">
              {[
                { label: '开始切割', gradient: 'from-blue-500 to-cyan-500' },
                { label: '体验重力', gradient: 'from-green-500 to-emerald-500' },
                { label: '银色轨迹', gradient: 'from-slate-400 to-silver-400' },
                { label: '无限创意', gradient: 'from-purple-500 to-pink-500' },
              ].map((btn, index) => (
                <button
                  key={index}
                  data-cuttable="true"
                  className="group relative px-10 py-5 rounded-full bg-gradient-to-r hover:shadow-[0_0_30px_rgba(192,192,192,0.3)] transition-all duration-500 hover:scale-105 cursor-crosshair overflow-hidden"
                  style={{ backgroundImage: `linear-gradient(135deg, var(--tw-gradient-stops))` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${btn.gradient} opacity-80 group-hover:opacity-100 transition-opacity`} />
                  
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" />
                  
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <span className="relative text-white font-bold text-lg tracking-wide">
                    {btn.label}
                  </span>
                </button>
              ))}
            </div>
          </section>

          <section className="relative bg-gray-800/20 backdrop-blur-xl rounded-3xl p-10 border border-gray-700/30">
            <div className="absolute inset-0 bg-gradient-to-br from-silver-500/5 via-transparent to-silver-500/5 rounded-3xl" />
            
            <div className="relative">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">
                使用说明
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: '左键点击',
                    description: '按下鼠标左键开始切割模式',
                    icon: 'M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122',
                  },
                  {
                    title: '拖拽切割',
                    description: '拖动鼠标绘制切割轨迹',
                    icon: 'M17 8l4 4m0 0l-4 4m4-4H3',
                  },
                  {
                    title: '释放鼠标',
                    description: '松开左键完成切割，元素下落',
                    icon: 'M19 14l-7 7m0 0l-7-7m7 7V3',
                  },
                ].map((step, index) => (
                  <div key={index} className="group flex flex-col items-center text-center p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-500">
                    <div className="relative mb-6">
                      <div className="absolute inset-0 bg-silver-400/30 blur-xl rounded-full group-hover:bg-silver-400/40 transition-colors" />
                      <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 border border-gray-600 flex items-center justify-center group-hover:border-silver-400/50 transition-colors">
                        <svg className="w-10 h-10 text-silver-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={step.icon} />
                        </svg>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="relative z-10 py-12 text-center">
        <div className="flex items-center justify-center gap-2 text-gray-500 text-sm mb-4">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
          <span>网页切割器 - 用创意切割网页</span>
        </div>
        <p className="text-gray-600 text-xs">Made with React + TailwindCSS</p>
      </footer>
    </div>
  );
};