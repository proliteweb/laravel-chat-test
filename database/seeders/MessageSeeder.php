<?php

namespace Database\Seeders;

use App\Models\Message;
use App\Models\User;
use Faker\Generator;
use Illuminate\Database\Seeder;
use Illuminate\Support\Collection;

class MessageSeeder extends Seeder
{
	/**
	 * @var Collection
	 */
	private $users;
	/**
	 * @var Generator
	 */
	private $factory;


	public function __construct(Generator $factory)
	{

		$this->factory = $factory;
	}

	public function run()
	{
		$messages = [];
		foreach (range(1, 500) as $item) {
			$messages[] = [
				'from' => $this->getRandomUser()->getKey(),
				'to' => $this->getRandomUser()->getKey(),
				'text' => $this->factory->sentence,
			];
		}
		Message::insert($messages);
	}

	protected function getRandomUser(): User
	{
		if (null === $this->users) {
			$this->users = User::all()->keyBy('id');
		}
		static $count;
		if (null === $count) {
			$count = $this->users->count();
		}
		$rand = random_int(1, $count);
		return $this->users->get($rand);
	}
}
