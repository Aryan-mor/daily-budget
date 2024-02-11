import clsx from 'clsx';
import {h} from 'preact';

const icons = [
    'icon-[solar--home-angle-2-linear]',
    'icon-[solar--notebook-minimalistic-linear]',
    'icon-[solar--chat-round-like-linear]',
    'icon-[solar--confounded-square-linear]',
    'icon-[ion--fast-food-outline]',
];

const Icons = ({activeIcon, onActiveIconChange}: {
    activeIcon?: string,
    onActiveIconChange: (newIcon: string) => void
}) => {
    return (
        <div className="flex gap-4">
            {icons.map(icon =>
                <div
                    key={icon}
                    onClick={() => onActiveIconChange(icon)}
                    className={clsx('flex p-2 rounded-md cursor-pointer', {
                        'hover:bg-gray-600/70': icon !== activeIcon,
                        'bg-blue-700/70': icon === activeIcon,
                    })}>
                    <span className={clsx('text-white text-4xl', icon)} />
                </div>)}
        </div>
    );
}
export default Icons