// Example components you can use in your scrollytelling slides

export const SkillBadge = ({ children }: { children: React.ReactNode }) => (
  <div className="px-4 py-2 bg-white/10 rounded-full text-white font-semibold text-center backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors">
    {children}
  </div>
);

export const ProjectCard = ({
  title,
  description,
  image,
  tags,
  link,
}: {
  title: string;
  description: string;
  image: string;
  tags?: string[];
  link?: string;
}) => (
  <div className="bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 max-w-md hover:border-white/30 transition-all hover:scale-105">
    <img
      src={image}
      alt={title}
      className="w-full h-48 object-cover"
    />
    <div className="p-6">
      <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
      <p className="text-white/80 mb-4">{description}</p>
      {tags && (
        <div className="flex gap-2 flex-wrap mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-white/10 rounded-full text-xs text-white"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      {link && (
        <a
          href={link}
          className="text-white font-semibold hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Project →
        </a>
      )}
    </div>
  </div>
);

export const StatBlock = ({
  number,
  label,
}: {
  number: string;
  label: string;
}) => (
  <div className="text-center">
    <div className="text-6xl font-bold text-white mb-2">{number}</div>
    <div className="text-xl text-white/70">{label}</div>
  </div>
);

export const QuoteCard = ({ quote, author }: { quote: string; author: string }) => (
  <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 max-w-xl">
    <div className="text-6xl text-white/30 mb-4">"</div>
    <p className="text-xl text-white/90 italic mb-6">{quote}</p>
    <p className="text-white/70 font-semibold">— {author}</p>
  </div>
);

export const TimelineItem = ({
  year,
  title,
  description,
}: {
  year: string;
  title: string;
  description: string;
}) => (
  <div className="flex gap-6 items-start">
    <div className="text-5xl font-bold text-white/30 min-w-[100px]">{year}</div>
    <div>
      <h3 className="text-3xl font-bold text-white mb-2">{title}</h3>
      <p className="text-white/80 text-lg">{description}</p>
    </div>
  </div>
);

export const IconSkillCard = ({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) => (
  <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-white/30 transition-all">
    <div className="text-4xl mb-3">{icon}</div>
    <h4 className="text-xl font-bold text-white mb-2">{title}</h4>
    <p className="text-white/70">{description}</p>
  </div>
);

export const MetricGrid = ({
  metrics,
}: {
  metrics: Array<{ value: string; label: string }>;
}) => (
  <div className="grid grid-cols-2 gap-6 max-w-2xl">
    {metrics.map((metric, idx) => (
      <StatBlock key={idx} number={metric.value} label={metric.label} />
    ))}
  </div>
);

